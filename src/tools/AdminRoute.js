import React from "react";
import useAuthContext from "../contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const { user } = useAuthContext();
  return user && user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
}

export default AdminRoute;
