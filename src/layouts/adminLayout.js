import React, { useEffect, useState } from "react";
import { HiMenuAlt3, HiOutlineLogout } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics, TbSchool } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart, AiOutlineTeam } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import router from "../tools/router";
import { set_user } from "../redux/actions/actionCreators";
import api from "../tools/api";
import { useDispatch } from "react-redux";
import Loading from "../tools/loader";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const menus = [
    { name: "dashboard", link: "/admin", icon: MdOutlineDashboard },
    { name: "my profile", link: "/admin/profile", icon: AiOutlineUser },
    { name: "teachers", link: "/admin/teachers", icon: AiOutlineTeam },
    { name: "Students", link: "/admin/students", icon: TbSchool },
    { name: "messages", link: "/", icon: FiMessageSquare },
    { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
    { name: "File Manager", link: "/", icon: FiFolder },
    { name: "Cart", link: "/", icon: FiShoppingCart },
    { name: "Saved", link: "/", icon: AiOutlineHeart, margin: true },
    { name: "Setting", link: "/", icon: RiSettings4Line },
  ];
  useEffect(() => {
    (() => {
      api
        .get("/api/user")
        .then((res) => {
          if (res) {
            dispatch(set_user(res.data.data));

            if (res.data.data.role !== "admin") {
              router.navigate("/login");
            }
          }
        })
        .catch((error) => {
          if (error.response.status !== 422) return router.navigate("/login");
        });
    })();
  }, []);

  const LogoutHandel = async (e) => {
    e.preventDefault();
    await api
      .post("/api/logout")
      .then((res) => {
        router.navigate("/login");
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
    <section
      className={`${open && "bg-gray-300"} flex z-10  relative`}
      style={{ height: "1000px" }}
    >
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4 fixed scroll-x-auto`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              onClick={(e) => setOpen(false)}
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

          <button
            onClick={LogoutHandel}
            className={` group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
          >
            <div>{React.createElement(HiOutlineLogout, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `1200ms`,
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
      <div className={` m-3  ml-20 text-xl text-gray-900 font-semibold z-100`}>
        <Outlet />
      </div>
    </section>
  );
};

export default AdminLayout;
