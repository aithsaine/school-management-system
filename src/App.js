import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/pages/Login";
import ProtectedRoute from "./tools/protectRoute";
import Dashobard from "./components/pages/auth/admin/dashboard";
import ProtectedLogin from "./tools/protectLoginPage";
import Admin from "./components/layouts/admin";
import Home from "./components/pages/home";
import User from "./components/pages/auth/admin/user";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Admin>
              <Dashobard />
            </Admin>
          }
        />
        <Route
          path="/user"
          element={
            <Admin>
              <User />
            </Admin>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
