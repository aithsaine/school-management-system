import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import api from "../tools/api";
import router from "../tools/router";
import { useDispatch } from "react-redux";
import Loading from "../tools/loader";
import { set_user } from "../redux/actions/actionCreators";

export default function StudentLayout() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("isLogged")) {
      (() => {
        api
          .get("/api/user")
          .then((res) => {
            if (res) {
              dispatch(set_user(res.data.data));
              if (res.data.data.role !== "student") {
                router.navigate("/");
              }
            }
          })
          .catch((error) => {
            if (error.response.status !== 422) return router.navigate("/login");
          });
      })();
    } else {
      router.navigate("/");
    }
  });

  /*const LogoutHandel = async (e) => {
    e.preventDefault();
    await api
      .post("/api/logout")
      .then((res) => {
        router.navigate("/login");
      })
      .catch((er) => console.log(er));
  };*/
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
    <div>
      studentLayout
      <Outlet />
    </div>
  );
}
