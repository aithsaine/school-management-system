import React from "react";
import { Link } from "react-router-dom";
import api from "../../tools/api";
export default function AuthNavbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { user } = props;
  const LogoutHandel = async (e) => {
    e.preventDefault();
    await api
      .post("/api/logout")
      .then((res) => {
        window.location.href = "/";
      })
      .catch((er) => console.log(er));
  };
  return (
    <>
      <nav className=" z-20 w-full bg-[#0e0e0e] flex flex-wrap items-center text-gray-100 justify-between px-2 py-3 navbar-expand-lg  shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              OFPPT
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-[#0e0e0e] lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col items-center lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <Link
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  to={"/"}
                >
                  <i className="text-blueGray-400 fa-sharp fa-solid fa-house text-lg leading-lg mr-2" />{" "}
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  to={`${user.role == "admin" ? "/admin" : "/student"}`}
                >
                  <i className="text-blueGray-400 fab fa-facebook text-lg leading-lg mr-2" />{" "}
                  Dashboard
                </Link>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row items-center list-none lg:ml-auto">
              <li className="flex items-center">
                <button onClick={LogoutHandel}>
                  <i className="fa fa-sign-out text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">LogOut</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
