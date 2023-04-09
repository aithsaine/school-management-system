import React from "react";
import useAuthContext from "../contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";

function GestRoute() {
  const { user } = useAuthContext();
  return user ? <Navigate to={"/admin"} /> : <Outlet />;
}

export default GestRoute;
