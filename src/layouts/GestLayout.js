import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
function GestLayout() {
  return (
    <>
      <Outlet />;
    </>
  );
}

export default GestLayout;
