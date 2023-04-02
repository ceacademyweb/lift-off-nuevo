import axios from "axios";


const api = axios.create({
  baseURL: "https://ceacademy-auth-production.up.railway.app",
})


export default api
