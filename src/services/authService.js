import axios from "axios";
import { getServerUrl } from "./configServer";

class AuthService {
    login = (data) => {
      return axios.post(getServerUrl() + "/api/user/login", data);
    };
  }
  
  export default new AuthService();
  