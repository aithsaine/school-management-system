import {
  FILTER_STUEDNTS,
  SET_BRANCHES,
  SET_GROUPS,
  SET_INFO,
  SET_STUDENTS,
  SET_TEACHERS,
  SET_USER,
} from "./types";
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
export const set_branches = (data) => {
  return {
    type: SET_BRANCHES,
    payload: data,
  };
};
export const set_teachers = (data) => {
  return {
    type: SET_TEACHERS,
    payload: data,
  };
};

export const set_groups = (data)=>{
  return{
    type:SET_GROUPS,
    payload:data
  }
}
