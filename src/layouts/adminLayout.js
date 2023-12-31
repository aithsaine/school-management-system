import React, { useEffect, useState } from "react";
import { HiMenuAlt1, HiOutlineLogout } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line, RiGroupLine } from "react-icons/ri";
import { TbSchool } from "react-icons/tb";
import { BiExport, BiImport,BiDoorOpen } from "react-icons/bi";
import "../assets/styles/main.css"

import {
  AiOutlineUser,
  AiOutlineTeam,
  AiOutlineUserAdd,
  AiOutlineSearch,
  AiTwotoneExperiment,
  AiOutlineUserSwitch,
  AiFillBook
} from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import router from "../tools/router";
import { set_info, set_user } from "../redux/actions/actionCreators";
import api from "../tools/api";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../tools/loader";
import AuthNavbar from "../components/navbars/AuthNavbar";
import Footer from "../components/footer";
const AdminLayout = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [isOpenSDP, setisOpenSDP] = useState(false);
  const [isOpenTDP, setisOpenTDP] = useState(false);
  const menus = [
    { name: "dashboard", link: "/admin", icon: MdOutlineDashboard },
    { name: "my profile", link: "/admin/profile", icon: AiOutlineUser },
    { name: "Setting", link: "/", icon: RiSettings4Line },
  ];

  useEffect(() => {
    if (localStorage.getItem("isLogged")) {
      (async () => {
        await api
          .get("/api/user")
          .then((res) => {
            if (res) {
              dispatch(set_user(res.data.data));
              api
                .get("/api/admin/info")
                .then((res) => {
                  dispatch(set_info(res.data));
                })
                .catch((error) => {
                  if (error.response.status !== 422)
                    return router.navigate("/");
                });
             
            }
          })
          .catch((error) => {
            if (error.response.status !== 422) {
              api.post("/api/logout").then((res) => {
                localStorage.removeItem("isLogged");
                router.navigate("/");
              });

            };
            router.navigate("/");
          });
      })();
    } else {
      router.navigate("/");
    }
  }, []);
  const user = useSelector((state) => state.user);

  const LogoutHandel = async (e) => {
    e.preventDefault();
    await api
      .post("/api/logout")
      .then((res) => {
        localStorage.removeItem("isLogged");
        router.navigate(-1);
      })
      .catch((er) => console.log(er));
  };

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
    user&&user.role=="admin"?
    <>
      <AuthNavbar role={localStorage.getItem("role")} />

      <section className={` flex  `}>
        <div
          className={`bg-[#0e0e0e] min-h-screen z-50 ${open ? "w-72" : "w-16"
            } duration-500 text-gray-100 px-4  `}
            >
          <div className="py-3 flex justify-end">
            <HiMenuAlt1
              size={26}
              className="cursor-pointer"
              onClick={() => {
                setOpen(!open);
                setisOpenSDP(false);
                setisOpenTDP(false);
              }}
              />
          </div>
          <div className="mt-4  scroll-x flex flex-col gap-4 ">
            {menus?.map((menu, i) => (
              <Link
              to={menu.link}
              onClick={(e) => {
                  setOpen(false);
                  setisOpenSDP(false);
                  setisOpenTDP(false);
                }}
                key={i}
                className={` ${menu?.margin && "mt-5"
                  } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                  >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}


              {/* Absence Item in Menu */}
              <Link
              to={"/admin/absences"}
              onClick={(e) => {
                setOpen(false);
                setisOpenSDP(false);
                setisOpenTDP(false);
              }}
              className={` group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>
                {React.createElement(BiDoorOpen, { size: "20" })}
              </div>
              <h2
                style={{
                  transitionDelay: `900ms`,
                }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
              >
                Absences
              </h2>
              <h2
                className={`${open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                Absences
              </h2>
            </Link>

            {/* Branches Item in Menu */}
            <Link
              to={"/admin/branches"}
              onClick={(e) => {
                setOpen(false);
                setisOpenSDP(false);
                setisOpenTDP(false);
              }}
              className={` group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>
                {React.createElement(AiTwotoneExperiment, { size: "20" })}
              </div>
              <h2
                style={{
                  transitionDelay: `900ms`,
                }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
              >
                Branches
              </h2>
              <h2
                className={`${open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                Branches
              </h2>
            </Link>


            {/* Modules Item in Menu */}
            <Link
              to={"/admin/modules"}
              onClick={(e) => {
                setOpen(false);
                setisOpenSDP(false);
                setisOpenTDP(false);
              }}
              className={` group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>
                {React.createElement(AiFillBook, { size: "20" })}
              </div>
              <h2
                style={{
                  transitionDelay: `800ms`,
                }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                  >
                Modules
              </h2>
              <h2
                className={`${open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                Modules
              </h2>
            </Link>

            {/* Groups Item in Menu */}
            <Link
              to={"/admin/groupes"}
              onClick={(e) => {
                setOpen(false);
                setisOpenSDP(false);
                setisOpenTDP(false);
              }}
              className={` group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
              <div>
                {React.createElement(RiGroupLine, { size: "20" })}
              </div>
              <h2
                style={{
                  transitionDelay: `900ms`,
                }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
              >
                Groupes
              </h2>
              <h2
                className={`${open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                Groupes
              </h2>
            </Link>
            {/* Formateur Item in Menu */}
            <button
              onClick={(e) => {
                setOpen(true);
                setisOpenTDP(!isOpenTDP);
                setisOpenSDP(false);
              }}
              className={` group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(AiOutlineTeam, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `900ms`,
                }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
              >
                Formateurs
              </h2>
              <h2
                className={`${open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                Formateurs
              </h2>
            </button>
            {isOpenTDP && (
              <ul className="left-0 ml-3 bg-[#0e0e0e]  rounded-md shadow-lg text-gray-100 ring-1 ring-black ring-opacity-5  z-10">
                <li className="flex align-center">
                  <Link
                    onClick={(e) => {
                      setOpen(false);
                      setisOpenTDP(false);
                    }}
                    to={"/admin/formateur/add"}
                    className="group flex items-center text-sm gap-3.5 font-medium p-2 text-gray-300  hover:text-gray-100"
                    >
                    <div>
                      {React.createElement(AiOutlineUserAdd, { size: "15" })}
                    </div>
                    <h2>Ajouter formateur</h2>{" "}
                  </Link>
                </li>

                <li className="flex align-center">
                  <Link
                    onClick={(e) => {
                      setOpen(false);
                      setisOpenTDP(false);
                    }}
                    to={"/admin/formateurs"}
                    className="group flex items-center text-sm gap-3.5 font-medium p-2 text-gray-300  hover:text-gray-100"
                  >
                    <div>
                      {React.createElement(AiOutlineUserSwitch, { size: "15" })}
                    </div>
                    <h2>List Formateurs</h2>{" "}
                  </Link>
                </li>
                <li className="flex align-center">
                  <Link
                    onClick={(e) => {
                      setOpen(false);
                      setisOpenTDP(false);
                    }}
                    to={"admin/formateur/affecter"}
                    className="group flex items-center text-sm gap-3.5 font-medium p-2 text-gray-300  hover:text-gray-100"
                  >
                    <div>
                      {React.createElement(AiOutlineSearch, { size: "15" })}
                    </div>
                    <h2>Affecter formateur</h2>{" "}
                  </Link>
                </li>
              </ul>
            )}
            {/* Stagiaire Item in Menu */}
            <button
              onClick={(e) => {
                setOpen(true);
                setisOpenSDP(!isOpenSDP);
                setisOpenTDP(false);
              }}
              className={` group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(TbSchool, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `900ms`,
                }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
              >
                Stagiaires
              </h2>
              <h2
                className={`${open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                Stagiaires
              </h2>
            </button>
            {isOpenSDP && (
              <ul className="left-0 ml-3 bg-[#0e0e0e]  rounded-md shadow-lg text-gray-100 ring-1 ring-black ring-opacity-5  z-10">
                <li className="flex align-center">
                  <Link
                    onClick={(e) => {
                      setOpen(false);
                      setisOpenSDP(false);
                    }}
                    to={"/admin/student/add"}
                    className="group flex items-center text-sm gap-3.5 font-medium p-2 text-gray-300  hover:text-gray-100"
                  >
                    <div>
                      {React.createElement(AiOutlineUserAdd, { size: "15" })}
                    </div>
                    <h2>Ajouter Stagiaire</h2>{" "}
                  </Link>
                </li>

                <li className="flex align-center">
                  <Link
                    onClick={(e) => {
                      setOpen(false);
                      setisOpenSDP(false);
                    }}
                    to={"/admin/students"}
                    className="group flex items-center text-sm gap-3.5 font-medium p-2 text-gray-300  hover:text-gray-100"
                  >
                    <div>
                      {React.createElement(AiOutlineUserSwitch, { size: "15" })}
                    </div>
                    <h2>List Stagiaires</h2>{" "}
                  </Link>
                </li>
                <li className="flex align-center">
                  <Link
                  to={"/admin/student/grilles"}
                    onClick={(e) => {
                      setOpen(false);
                      setisOpenSDP(false);
                    }}
                    className="group flex items-center text-sm gap-3.5 font-medium p-2 text-gray-300  hover:text-gray-100"
                    >
                    <div>
                      {React.createElement(BiExport, { size: "15" })}
                    </div>
                    <h2>Exporter grille</h2>{" "}
                  </Link>
                </li>
                <li className="flex align-center">
                  <Link
                    onClick={(e) => {
                      setOpen(false);
                      setisOpenSDP(false);
                    }}
                    className="group flex items-center text-sm gap-3.5 font-medium p-2 text-gray-300  hover:text-gray-100"
                    >
                    <div>
                      {React.createElement(BiImport, { size: "15" })}
                    </div>
                    <h2>Import Stagiaires</h2>{" "}
                  </Link>
                </li>
              </ul>
            )}
            {/* LogOut Item in Menu */}
            <a
            href="/"
              onClick={LogoutHandel}
              className={` group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(HiOutlineLogout, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `1200ms`,
                }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
              >
                logout
              </h2>
              <h2
                className={`${open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                logout
              </h2>
            </a>
          </div>
        </div>
        <div
          className={` my-5 overflow-x-hidden ml-5 w-full text-xl text-gray-900 font-semibold z-100`}
          >
          <Outlet />
        </div>
      </section>
      <Footer/>

    </>:<Loading />
  );


};

export default AdminLayout;
