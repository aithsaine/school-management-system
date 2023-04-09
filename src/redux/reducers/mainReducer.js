import { LOGIN, LOGOUT, USER } from "../actions/types";

export const mainReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case USER:
      return { ...state, user: action.payload };
  }
  return { ...state };
};
