import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";

export const Routes = createBrowserRouter([
    {
        path:"/",
        element:""
    },
    {
        path:"/login",
        element : <Login/>,
        
    }
])