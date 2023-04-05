import { LOGIN, LOGOUT } from "../actions/types";

export const mainReducer = (state={
    islogged:sessionStorage.getItem("auth_token")!=null,
    user:sessionStorage.getItem("name")?sessionStorage.getItem("name"):null,
    token:sessionStorage.getItem("auth_token")!=null?sessionStorage.getItem("auth_token"):null
},action)=>{
switch(action.type){
    case LOGIN:
        if(!state.islogged){
            sessionStorage.setItem("auth_token",action.payload.token)
            sessionStorage.setItem("name",action.payload.user.name)
        }
        return {...state}
    case LOGOUT:
        if(state.islogged)
        {
            sessionStorage.removeItem("auth_token")
        }
        return {...state}
}
return {...state}
}