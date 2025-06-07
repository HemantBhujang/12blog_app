import conf from "../conf/conf"
import {Client, Databases, Storage, Query, ID} from "appwrite"

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteurl )
        .setProject(conf.projectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
            
        } catch (error) {
            console.log("Appwrite Service :: CreatePost :: error", error);
            
        }
    }

    async updatePost ( slug, {title, content, featuredImage, status, userId}){
        try {
            conf.databaseId,
            conf.collectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
            }
            
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error",error);
            
        }
    }

    async deletePost (slug){
        try {
            await this.databases.deleteDocument(
            conf.databaseId,
            conf.collectionId,
            slug,
            )
            
            return true ;
        } catch (error) {
            console.log("Appwrite Service :: DeletePost :: error",error);
            return false;
        }
    }

    async getPost (slug){
        try {
            return await this.databases.getDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
            )
            
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error",error);
            return false;
            
        }
    }

    async getPosts (queries = [Query.equal( "status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.databaseId,
                conf.collectionId,
                queries
            )
            
        } catch (error) {
            console.log("Appwrite Services :: getPosts :: error",error);
            return false;
            
            
        }
    }

    //file upload service
    async uploadFile (file){
        try {
            return await this.bucket.createFile(
                conf.bucketId,
                ID.unique(),
                file            
            )
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error",error);
            return false
            
            
        }
    }

    async deleteFile(FileId){
        try {
            return await this.bucket.deleteFile(
                conf.bucketId,
                FileId
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error", error);
            return false
            
        }
    }

    getFilePreview(FileId){
        return this.bucket.getFilePreview(
            conf.bucketId,
            FileId
        )
    }
}

const service = new Service();
export default service 