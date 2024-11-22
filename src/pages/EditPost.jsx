import { Container, PostForm, Loader } from "../components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import databaseService from "../appwrite/confige";

export default function EditPost(){

    const {slug} = useParams()
    const [post, setPost] = useState(null)
    const [loading,setLoading] = useState(false);

    useEffect( () => {
        setLoading(true);
        databaseService.getPost(slug)
        .then( (res) => {if(res) setPost(res) } )
        .catch(()=> console.log('Sorry, post with SLUG : ',slug,' not found.') )
        .finally(()=> setLoading(false) )
    } , [slug] )

    return !loading ? ( post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null )  :   ( <Loader /> )
}