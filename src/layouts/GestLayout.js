import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
function GestLayout() {
  return (
    <div className="h-screen flex flex-col justify-between  ">
      <Navbar />
      <div className="flex flex-center mt-10">
        <Outlet />;
      </div>
      <Footer />
    </div>
  );
}

export default GestLayout;
