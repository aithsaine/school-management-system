import {
  FILTER_STUEDNTS,
  SET_BRANCHES,
  SET_GROUPS,
  SET_INFO,
  SET_STUDENTS,
  SET_TEACHERS,
  SET_USER,
} from "./actions/types";
const reducer = (
  state = {
    students: [],
    branches: [],
    levels: [],
    teachers: [],
    groups: [],
    options:[]
  },
  action
) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_INFO:
      return {
        ...state,
        branches: action.payload.branches,
        levels: action.payload.levels,
        teachers: action.payload.teachers,
        groups: action.payload.groups,
        students: action.payload.students,
        options:action.payload.options
      };
    case SET_STUDENTS:
      return { ...state, students: action.payload };
    case FILTER_STUEDNTS:
      return { ...state, students: action.payload };
    case SET_BRANCHES:
      return { ...state, branches: action.payload };
    case SET_TEACHERS:
      return { ...state, teachers: action.payload };
    case SET_GROUPS:
      return {...state, groups:action.payload}
    default:
      return { ...state };
  }
};

export default reducer;
