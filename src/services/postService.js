import axios from "axios";
import { getServerUrl } from "./configServer";



class PostService{
    getPosts(){
        return axios.get(getServerUrl()+`/api/post`)
    }
    getPost(id){
        return axios.get(getServerUrl()+`/api/post/${id}`)
    }
    getPostUsers(id){
        return axios.get(getServerUrl()+`/api/post/user/${id}`)
    }
    postPost(data){
        return axios.post(getServerUrl()+`/api/post`, data)
    }
    deletePost(id){
        return axios.delete(getServerUrl()+`/api/post/${id}`)
    }
    updatePost(id, data){
        return axios.put(getServerUrl()+`/api/post/${id}`, data)
    }
}

export default new PostService