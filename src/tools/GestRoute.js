import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function GestRoute() {
  const user = useSelector((state) => state.user);
  return user ? <Navigate to={"/admin"} /> : <Outlet />;
}

export default GestRoute;
