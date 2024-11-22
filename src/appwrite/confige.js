import config from "../config/config";
import { Client, Databases, Storage, ID, Query } from "appwrite"

export class DatabaseService{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)

        this.databases = new Databases(this.client)

        this.bucket = new Storage(this.client)
    }

    async createPost({userId, slug, title, content, featuredImage, status}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {userId, title, content, featuredImage, status}
            )
        } catch (error) {
            console.log("appwrite :: createPost :: error ",error)
            throw(error)
        }
    }
    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {title, content, featuredImage, status}
            )
        } catch (error) {
            console.log("appwrite :: updatePost :: error ",error)
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("appwrite :: deletePost :: error ",error)
            return false;
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("appwrite :: getPost :: error ",error)
        }
    }
    async getPosts([attribute , value ]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [Query.equal(attribute,[...value])]
            )
        } catch (error) {
            console.log("appwrite :: getPosts :: error ", error)
        }
    }

    //file functions here...

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appwrite :: uploadFile :: error ",error)
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) { 
            console.log("appwrite :: deletePost :: error ",error)
            return false
        }
    }

    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("appwrite :: getFilePreview :: error ",error)
            throw(error)
        }
    }

}

const databaseService = new DatabaseService();

export default databaseService