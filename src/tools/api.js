import axios from "axios";
import router from "./router";
const token = localStorage.getItem("auth_token") ?? null;
const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401)
      return router.navigate("/login");
    throw error;
  }
);

export default api;
