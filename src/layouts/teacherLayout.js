import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import api from "../tools/api";
import router from "../tools/router";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../tools/loader";
import "../assets/styles/main.css"
import {
  set_info,
  set_teacher,
  set_user,
} from "../redux/actions/actionCreators";
import GestNavbar from "../components/navbars/GestNavbar";
import AuthNavbar from "../components/navbars/AuthNavbar";
import { HiMenuAlt1, HiOutlineLogout } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiFillBook, AiOutlineUser } from "react-icons/ai";
import { RiSettings4Line } from "react-icons/ri";
import {BiBookmark} from "react-icons/bi"
import Footer from "../components/footer";

export default function TeacherLayout() {
  const [navbar, setNavbar] = useState(<GestNavbar />);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const {user} = useSelector(state=>state)
  const [isOpenNDP,setisOpenNDP] = useState(false)
  const menus = [
    { name: "dashboard", link: "/formateur", icon: MdOutlineDashboard },
    { name: "my profile", link: "/formateur/profile", icon: AiOutlineUser },
    { name: "Setting", link: "/", icon: RiSettings4Line },
  ];
  const LogoutHandel = async (e) => {
    e.preventDefault();
    await api
      .post("/api/logout")
      .then((res) => {
        localStorage.removeItem("isLogged");
        router.navigate("/");
      })
      .catch((er) => console.log(er));
  };
  useEffect(() => {
    if (localStorage.getItem("isLogged")) {
      (async () => {
        await api
          .get("/api/user")
          .then((res) => {
            if (res) {
              (async () => {
                await api
                  .get(`api/teacher/${res.data.data.id}/info`)
                  .then((result) => {
                    if (result) {
                      dispatch(set_info(result.data));
                      dispatch(set_teacher(result.data.teacher));
                    }
                  })
                  .catch((error) => {
                    if (error.response.status !== 422)
                      return router.navigate("/");
                  });
              })();

              dispatch(set_user(res.data.data));
              setNavbar(<AuthNavbar role={res.data.data.role} />);
              if (res.data.data.role !== "teacher") {
                router.navigate("/");
              }
            }
          })
          .catch((error) => {
            if (error.response.status !== 422) {
              api.post("/api/logout").then((res) => {
                localStorage.removeItem("isLogged");
                router.navigate("/");
              });
            }
          });
      })();
    } else {
      router.navigate("/");
    }
  }, []);

  /*const LogoutHandel = async (e) => {
    e.preventDefault();
    await api
      .post("/api/logout")
      .then((res) => {
        router.navigate("/");
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
if(user&&user.role==="teacher")
  return (
    <>
      {navbar}

      <section className={` flex  `}>
        <div
          className={`bg-[#0e0e0e] min-h-screen z-50 ${
            open ? "w-72" : "w-16"
          } duration-500 text-gray-100 px-4  `}
        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt1
              size={26}
              className="cursor-pointer"
              onClick={() => {
                setOpen(!open);
                setisOpenNDP(false)
                
              }}
            />
          </div>
          <div className="mt-4  scroll-x flex flex-col gap-4 ">
            {menus?.map((menu, i) => (
              <Link
                to={menu.link}
                onClick={(e) => {
                  setOpen(false);
                  setisOpenNDP(false)
                }}
                key={i}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}

   {/* Notes Item in Menu */}
   <button
              onClick={(e) => {
                setOpen(true);
                setisOpenNDP(!isOpenNDP);
              }}
              className={` group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(BiBookmark, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `900ms`,
                }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
              >
                Les Note
              </h2>
              <h2
                className={`${open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                Les Note
              </h2>
            </button>
            {isOpenNDP && (
              <ul className="left-0 ml-3 bg-[#0e0e0e]  rounded-md shadow-lg text-gray-100 ring-1 ring-black ring-opacity-5  z-10">
                <li className="flex align-center">
                  <Link
                    onClick={(e) => {
                      setOpen(false);
                      setisOpenNDP(false);
                    }}
                    to={"/formateur/notes/grille"}
                    className="group flex items-center text-sm gap-3.5 font-medium p-2 text-gray-300  hover:text-gray-100"
                  >
                    <div>
                      {/* {React.createElement(AiOutlineUserAdd, { size: "15" })} */}
                    </div>
                    <h2>Exporter les grille</h2>{" "}
                  </Link>
                </li>

                <li className="flex align-center">
                  <Link
                    onClick={(e) => {
                      setOpen(false);
                      setisOpenNDP(false);
                    }}
                    to={"/admin/students"}
                    className="group flex items-center text-sm gap-3.5 font-medium p-2 text-gray-300  hover:text-gray-100"
                  >
                    <div>
                      {/* {React.createElement(AiOutlineUserSwitch, { size: "15" })} */}
                    </div>
                    <h2>Importer les notes</h2>{" "}
                  </Link>
                </li>
                <li className="flex align-center">
                  <Link
                  to={"/formateur/note/ByStudent"}
                    onClick={(e) => {
                      setOpen(false);
                      setisOpenNDP(false);
                    }}
                    className="group flex items-center text-sm gap-3.5 font-medium p-2 text-gray-300  hover:text-gray-100"
                    >
                    <div>
                      {/* {React.createElement(AiOutlineSearch, { size: "15" })} */}
                    </div>
                    <h2>Suivre les Note par stagiaire</h2>{" "}
                  </Link>
                </li>
              </ul>
            )}


            {/* Modules Item in Menu */}
            <Link
              to={"/formateur/modules"}
              onClick={(e) => {
                setOpen(false);
                setisOpenNDP(false)

              }}
              className={` group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(AiFillBook, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `800ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                Modules
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                Modules
              </h2>
            </Link>
            {/* LogOut Item in Menu */}
            <button
              onClick={LogoutHandel}
              className={` group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(HiOutlineLogout, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `800ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                logout
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                logout
              </h2>
            </button>
          </div>
        </div>
        <div
          className={` m-5 overflow-x-hidden ml-5 w-full text-xl text-gray-900 font-semibold z-100`}
        >
          <Outlet />
        </div>
      </section>
      <Footer />
    </>
  );
  else{
    return <Loading />;
  }
}
