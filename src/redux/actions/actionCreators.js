import { FILTER_STUEDNTS, SET_INFO, SET_STUDENTS, SET_USER } from "./types";
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
export const set_info = (data) => {
  return {
    type: SET_INFO,
    payload: data,
  };
};
export const filter_students = (data) => {
  return {
    type: FILTER_STUEDNTS,
    payload: data,
  };
};
