import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'
import databaseService from '../appwrite/confige'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Input, RTE, Select,Loader } from './index'


export default function postForm({post}){

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const userData = useSelector( state => state.userData)

    const { register, handleSubmit, watch, control, setValue, getValues} = useForm({
        defaultValues : {
            title : post?.title || '',
            content : post?.content || '',
            slug : post?.$id || '',
            status : post?.status || 'active'
        }
    });
    
    const submit = async (data) => {
        
        setLoading(true);

        if(post){

            const file = data.featuredImage[0] ? await databaseService.uploadFile(data.featuredImage[0]) : null;

            if(file) databaseService.deleteFile(post.featuredImage);

            const dbPost = await databaseService.updatePost(post.$id,{
                ...data,
                featuredImage : file ? file.$id : undefined
            });

            setLoading(false);
            
            if(dbPost) navigate(`/post/${dbPost.$id}`);
            
        } else {
            
            const file = data.featuredImage[0] ? await databaseService.uploadFile(data.featuredImage[0]) : null;
            
            if (file){
                
                const dbPost = await databaseService.createPost({
                    userId : userData.$id,
                    ...data,
                    featuredImage : file.$id
                });
                setLoading(false);
                if(dbPost) navigate(`/post/${dbPost.$id}`);

            }
        }
    }

    const slugTransform = useCallback((value) => {
        if( value && typeof value === "string"){
            const slug = value
            .trim()
            .toLowerCase()
            .replace(/[^/a-zA-Z\d]/g, '-')
            .replace(/-+/g, '-')
            return slug;
        }

        return "";
    })

    useEffect( () => {
        const subscription = watch( ( value, {name} ) => {
            if( name === "title") setValue('slug', slugTransform(value.title),{ shouldValidate : true });
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue])

    return !loading ? (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row">
            <div className="md:w-2/3 px-2 my-5">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                    
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues(String("content"))} />
            </div>

            <div className="md:w-1/3 px-2 my-5">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("featuredImage", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={databaseService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <div className="">Status :</div>
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" className="w-full bg-blue-500 my-5">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    ) : ( <Loader /> )
     
}