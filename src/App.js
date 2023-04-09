import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/pages/Login";
import Dashobard from "./components/pages/auth/admin/dashboard";
import Admin from "./components/layouts/admin";
import Home from "./components/pages/home";
import User from "./components/pages/auth/admin/user";
import AuthRoute from "./tools/AuthRoute";
import GestRoute from "./tools/GestRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<GestRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AuthRoute />}>
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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
