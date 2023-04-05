import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedLogin = ({children}) => {
    const islogged = useSelector((state) => state.islogged);
    let location = useLocation();

    if(islogged) {
        return <Navigate to="/dashboard" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedLogin;