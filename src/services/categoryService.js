import axios from "axios";
import { getServerUrl } from "./configServer";



class CategoryService{
    getCategories(){
        return axios.get(getServerUrl()+`/api/category`)
    }
    postCategory(data){
        return axios.post(getServerUrl()+`/api/category`, data)
    }
    deleteCategory(id){
        return axios.delete(getServerUrl()+`/api/category/${id}`)
    }
    updateCategory(id, data){
        return axios.put(getServerUrl()+`/api/category/${id}`, data)
    }
}

export default new CategoryService