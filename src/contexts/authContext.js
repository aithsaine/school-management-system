import { createContext, useContext, useEffect, useState } from "react";
import api from "../tools/api";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const csrf = () => api.get("/sanctum/csrf-cookie");
  const [user, setUser] = useState();
  const [token, setToken] = useState(
    localStorage.getItem("auth_token") ?? null
  );
  const [role, setRole] = useState(localStorage.getItem("role") ?? null);

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, role, setRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
