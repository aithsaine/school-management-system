import { LOGIN, LOGOUT, USER } from "./types";

export const Logout_Action = (data) => {
  return {
    type: LOGOUT,
    payload: data,
  };
};
export const set_user = (data) => {
  return {
    type: USER,
    payload: data,
  };
};
