import { createBrowserRouter } from "react-router-dom";
import GestLayout from "../layouts/GestLayout";
import Login from "../pages/Login";
import Home from "../pages/home";
import AdminLayout from "../layouts/adminLayout";
import AdminDashboard from "../components/admin/adminDashboard";
import Students from "../components/admin/students/list";
import Teachers from "../components/admin/teachers";
import Profile from "../components/admin/profile";
import StudentLayout from "../layouts/studentLayout";
import StudentDahsboard from "../components/student/studentDahsboard";
import AddStudent from "../components/admin/students/add";
import Error404 from "../pages/404";
import Branches from "../components/admin/branches/list";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GestLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/student",
    element: <StudentLayout />,
    children: [
      {
        path: "/student/",
        element: <StudentDahsboard />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/students",
        element: <Students />,
      },
      {
        path: "/admin/student/add",
        element: <AddStudent />,
      },
      {
        path: "/admin/branches",
        element: <Branches />,
      },
      {
        path: "/admin/teachers",
        element: <Teachers />,
      },
      {
        path: "/admin/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
export default router;
