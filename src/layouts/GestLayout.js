import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import Loading from "../tools/loader";
import { useDispatch, useSelector } from "react-redux";
import api from "../tools/api";
import { set_user } from "../redux/actions/actionCreators";
import AuthNavbar from "../components/navbars/AuthNavbar";
import GestNavbar from "../components/navbars/GestNavbar";

function GestLayout() {
  const [navbar, setNavbar] = useState();
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
      (async() => {
       await api
          .get("/api/user")
          .then((res) => {
            if (res) {
              dispatch(set_user(res.data.data));
              setNavbar(<AuthNavbar role={res.data.data.role} />);
            }
            else{
              setNavbar(<GestNavbar/>)
            }
          })
          .catch((error) => {
            setNavbar(<GestNavbar/>)
          });
      })();
    
  }, []);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);
  // if (isLoading) {
  //   return <Loading />;
  // }
  return (
    navbar?
    <div className="h-screen flex flex-col justify-between  ">
      {navbar}
      <div className=" ">
        <Outlet />;
      </div>
      <Footer />
    </div>:<Loading />
  );
}
export default GestLayout;
