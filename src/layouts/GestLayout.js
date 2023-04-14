import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import router from "../tools/router";
import api from "../tools/api";
function GestLayout() {
  return (
    <>
      <Outlet />;
    </>
  );
}

export default GestLayout;
