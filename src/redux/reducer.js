import { SET_INFO, SET_USER } from "./actions/types";
const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_INFO:
      return {
        ...state,
        students: action.payload.students,
        branches: action.payload.branches,
        levels: action.payload.levels,
        teachers: action.payload.teachers,
      };
    default:
      return { ...state };
  }
};

export default reducer;
