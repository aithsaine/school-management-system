import {
  FILTER_STUEDNTS,
  SET_INFO,
  SET_STUDENTS,
  SET_USER,
} from "./actions/types";
const reducer = (
  state = {
    students: [],
    branches: [],
    levels: [],
    teachers: [],
    groups: [],
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
      };
    case SET_STUDENTS:
      return { ...state, students: action.payload };
    case FILTER_STUEDNTS:
      return { ...state, students: action.payload };
    default:
      return { ...state };
  }
};

export default reducer;
