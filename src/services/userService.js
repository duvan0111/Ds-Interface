import axios from "axios";
import { getServerUrl } from "./configServer";



class UserService{
    getUsers(){
        return axios.get(getServerUrl()+`/api/user`)
    }
    getUserPost(id){
        return axios.get(getServerUrl()+`/api/user/${id}`)
    }
    postUser(data){
        return axios.post(getServerUrl()+`/api/user/signup`, data)
    }
    deleteUser(id){
        return axios.delete(getServerUrl()+`/api/user/${id}`)
    }
    updateUser(id, data){
        return axios.put(getServerUrl()+`/api/user/${id}`, data)
    }
}

export default new UserService