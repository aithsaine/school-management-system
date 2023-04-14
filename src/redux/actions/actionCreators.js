import { SET_USER } from "./types";

export const set_user = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
