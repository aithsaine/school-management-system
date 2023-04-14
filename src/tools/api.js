import axios from "axios";
import router from "./router";
const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return router.navigate("/login");
  }
);

export default api;
export const csrf = async () => await api.get("sanctum/csrf-cookie");
