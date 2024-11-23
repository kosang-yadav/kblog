import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/confige";
import { Button, Container, Loader } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const userData = useSelector((state) => state.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        
        setLoading(true);
        if (slug) {
            appwriteService.getPost(slug)
            .then((post) => {
                if (post) setPost(post);
                else navigate("/");})
            .catch(()=> console.log('Sorry, post with SLUG : ',slug,' not found.') )
            .finally(()=> setLoading(false) )

        } else {
            setLoading(false);
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        setLoading(true);
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                setLoading(false);
                navigate("/");
            }
        });
        setLoading(false);
    };

    return post ? (
        <div  className="py-6 w-screen bg-[url('../../static/images/mob-back.jpg')] md:bg-[url('../../static/images/full-back.webp')] bg-no-repeat bg-cover bg-center bg-fixed text-black " >
            <Container>
                <div className="w-full flex justify-center mb-4 relative border-2 rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 ">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgcolor="bg-green-400" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgcolor="bg-red-400" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="flex flex-col ">
                    <div className="mt-10 mb-20 self-center border-2 p-4 bg-black rounded-3xl">
                        <h1 className="text-6xl font-bold text-white">{post.title}</h1>
                    </div>
                    <div className="browser-css mb-20 p-3 m-5 border-2 bg-white rounded-3xl">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}