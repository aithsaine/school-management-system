import React from "react";
import useAuthContext from "../contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";

function AuthRoute() {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to={"/login"} />;
}

export default AuthRoute;
