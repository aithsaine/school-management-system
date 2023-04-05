import { LOGIN } from "../actions/types";
const initial_state = {
    islogged:sessionStorage.getItem("auth_token")!=null,
    user:null
}

export const mainReducer = (state=initial_state,action)=>{
switch(action.type){
    case LOGIN:
        if(!state.islogged){
            sessionStorage.setItem("auth_token",action.payload.token)
        }
        return {...state}
}
return {...state}
}