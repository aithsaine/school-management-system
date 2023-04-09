import { createContext, useContext, useEffect, useState } from "react";
import api from "../tools/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { set_user } from "../redux/actions/actionCreators";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const csrf = () => api.get("/sanctum/csrf-cookie");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const getUser = async () => {
    await csrf();
    const { data } = await api.get("/api/user");
    dispatch(set_user(data.data));
  };

  const login = async ({ ...data }) => {
    await csrf();
    try {
      await api.post("/login", data);
      getUser();
      switch (user.role) {
        case "admin":
          navigate("/admin");
        case "teacher":
          navigate("/teacher");
        default:
          navigate("/student");
      }
      navigate("/admin");
    } catch (er) {
      if (er.response.status === "422") {
        setErrors(er.response.data.errors);
      } else {
        console.log(er.response.status);
      }
    }
  };
  const logout = async () => {
    await csrf();
    try {
      await api.post("/logout");
      dispatch(set_user(null));
      navigate("/login");
    } catch (er) {
      console.log(er);
    }
  };
  useEffect(() => {
    if (!user) getUser();
  });

  return (
    <AuthContext.Provider value={{ errors, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
