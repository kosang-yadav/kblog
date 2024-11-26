import { Container, PostCard, Loader } from "../components";
import { useState, useEffect } from "react";
import databaseService from "../appwrite/confige";

export default function AllPosts(){

    const [posts, setPosts] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect( () => {
        setLoading(true);
        databaseService.getPosts(["status",["active"]])
        .then( (res) => { if(res) setPosts(res.documents) } )
        .catch(()=> console.log('Sorry, No post found') )
        .finally(()=> setLoading(false) )
    } , [] )

    return !loading ? (
        <div className=" w-fit sm:w-full py-8 min-h-screen text-right">
            <h1 className=" text-6xl sm:text-8xl mx-2 pr-5 font-semibold">Everyone's Posts </h1>
            <Container>
                <div className="flex flex-wrap items-center mt-14">
                    { posts.map( (post) => (
                        <div key = {post.$id} className="p-2  md:w-1/5 w-2/6" >
                            <PostCard {...post} />
                        </div>
                    ) ) }
                </div>
            </Container>
        </div>
    ) :( <Loader /> )
}