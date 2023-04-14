import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/navbar2";
import Footer from "../components/footer";
import Loading from "../tools/loader";
function GestLayout() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
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
