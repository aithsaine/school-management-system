import React from "react";
import { Outlet } from "react-router-dom";
import useAuthContext from "../contexts/authContext";
import router from "../tools/router";
function GestLayout() {
  const { token, role } = useAuthContext();
  if (token && role == "admin") return router.navigate("admin");
  return <Outlet />;
}

export default GestLayout;
