import { Container, PostCard } from "../components";
import { useState, useEffect } from "react";
import databaseService from "../appwrite/confige";
import { useSelector } from "react-redux";
import { YinYang, Loader, Button } from "../components"
import { useNavigate } from "react-router-dom";

const baka = "baka"

export default function Home(){

    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const userData = useSelector( state => state.userData)
    const navigate = useNavigate()


    useEffect( () => {
        // window.location.reload();
        setLoading(true)
        databaseService.getPosts(["status",["active","inactive"]])
        .then( (res) => { if(res) setPosts(res.documents) } )
        .catch(()=> console.log("Sorry, No Post Found.") )
        .finally(()=> setLoading(false))
        // console.log(baka)
        } , [userData] )

    
    return !loading ? ( (posts.length === 0) ? (

        <div className="absolute w-full h-screen text-center">
            <YinYang />
        </div>
    ) : (
        <div className="sm:mx-2 w-fit sm:w-full md:px-6 min-h-screen  py-8">
            <div className="text-3xl font-semibold text-left mx-2 sm:ml-6">Welcome Back <br/><span className="text-red-500 font-black text-5xl hover:text-7xl ">{userData.name}</span>,&nbsp;<br/>How's your day Today...<br/> <br /> <div className="text-right pr-5 text-1xl sm:text-4xl"> <h1>Your Posts</h1>  </div></div>
            <Container>
                <div className="flex flex-wrap w-full my-10 mx-2 sm:ml-6 sm:mr-4">
                    { posts.map( (post) => (
                        (userData.$id==post.userId) ?
                        (<div key = {post.$id} className="p-2 sm:w-1/5 w-2/6" >
                            <PostCard {...post} />
                        </div>)
                        : null
                    ) ) }
                </div>
                <div className="w-full flex justify-center my-8">
                    <Button type="button" className="text-3xl font-bold px-8 bg-red-500" onClick={() => navigate("/add-post") } > New Post </Button>
                </div>
            </Container>
        </div>
    )   )   :   ( <Loader /> );
}


//     if (posts.length === 0) {
//         return (
//             <div className="w-full py-8 mt-4 text-center">
//                 <Container>
//                     <div className="flex flex-wrap">
//                         <div className="p-2 w-full">
//                             <h1 className="text-2xl font-bold hover:text-gray-500">
//                                 Login to read posts
//                             </h1>
//                         </div>
//                     </div>
//                 </Container>
//             </div>
//         )
//     }
//     return (
//         <div className='w-full py-8'>
//             <Container>
//                 <div className='flex flex-wrap'>
//                     {posts.map((post) => (
//                         <div key={post.$id} className='p-2 w-1/4'>
//                             <PostCard {...post} />
//                         </div>
//                     ))}
//                 </div>
//             </Container>
//         </div>
//     )
// }