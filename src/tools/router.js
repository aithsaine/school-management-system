import { createBrowserRouter } from "react-router-dom";
import GestLayout from "../layouts/GestLayout";
import Login from "../pages/Login";
import Home from "../pages/home";
import AdminLayout from "../layouts/adminLayout";
import AdminDashboard from "../components/admin/adminDashboard";
import Students from "../components/admin/students";
import Teachers from "../components/admin/teachers";
import Profile from "../components/admin/profile";
import StudentLayout from "../layouts/studentLayout";
import StudentDahsboard from "../components/student/studentDahsboard";

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
        path: "/admin/teachers",
        element: <Teachers />,
      },
      {
        path: "/admin/profile",
        element: <Profile />,
      },
    ],
  },
]);
export default router;
