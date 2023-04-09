import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import AdminDashobard from "./components/admin/adminDashboard";
import Admin from "./layouts/admin";
import Home from "./pages/home";
import Profile from "./components/admin/profile";
import AdminRoute from "./tools/AdminRoute";
import GestRoute from "./tools/GestRoute";
import Students from "./components/admin/students";
import Teachers from "./components/admin/teachers";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<GestRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route
            path="/admin"
            element={
              <Admin>
                <AdminDashobard />
              </Admin>
            }
          />
          <Route
            path="admin/profile"
            element={
              <Admin>
                <Profile />
              </Admin>
            }
          />
          <Route
            path="admin/students"
            element={
              <Admin>
                <Students />
              </Admin>
            }
          />
          <Route
            path="admin/teachers"
            element={
              <Admin>
                <Teachers />
              </Admin>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
