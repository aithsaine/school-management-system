import { SET_STUDENTS, SET_USER } from "./types";
export const set_user = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
export const set_students = (students) => {
  return {
    type: SET_STUDENTS,
    payload: students,
  };
};
