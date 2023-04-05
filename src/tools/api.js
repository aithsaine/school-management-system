import axios  from "axios"
import { useSelector } from "react-redux"
const islogged = sessionStorage.getItem("auth_token") !=null
    const api  = axios.create({
        baseURL:"http://localhost:8000/api"})


export  default api;



