import { LOGIN, LOGOUT } from "./types"

export const  Login_Action =(data)=>
{
    return {
        type:LOGIN,
        payload:data
    }
}
export const  Logout_Action =(data)=>
{
    return {
        type:LOGOUT,
        payload:data
    }
}