import axios from "axios";
import { getServerUrl } from "./configServer";



class CommentService{
    getcomments(id){
        return axios.get(getServerUrl()+`/api/comment/${id}`)
    }
    postComment(data){
        return axios.post(getServerUrl()+`/api/comment`, data)
    }
}

export default new CommentService