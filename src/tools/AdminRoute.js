import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoute() {
  const user = useSelector((state) => state.user);
  return user && user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
}

export default AdminRoute;
