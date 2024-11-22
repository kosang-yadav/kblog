import { Link } from "react-router-dom"
import databaseService from "../appwrite/confige"

const PostCard = ({$id, featuredImage, title}) => {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl min-w-min p-4">
                <div className="w-full justify-center mb-4">
                    <img src={databaseService.getFilePreview(featuredImage)} alt={featuredImage} className="rounded-x1"/>
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard