import { createContext, useContext, useEffect, useState } from "react";
import api from "../tools/api";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const csrf = () => api.get("/sanctum/csrf-cookie");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const getUser = async () => {
    await csrf();
    const { data } = await api.get("/api/user");
    setUser(data);
  };

  const login = async ({ ...data }) => {
    await csrf();
    try {
      await api.post("/login", data);
      getUser();
      navigate("/dashboard");
    } catch (er) {
      if (er.response.status == "422") {
        setErrors(er.response.data.errors);
      }
    }
  };
  const logout = async () => {
    await csrf();
    try {
      await api.post("/logout");
      setUser(null);
      navigate("/login");
    } catch (er) {
      console.log(er);
    }
  };
  useEffect(() => {
    if (!user) getUser();
  });

  return (
    <AuthContext.Provider value={{ user, errors, login, getUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
