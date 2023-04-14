import { SET_USER } from "./actions/types";
const initial_state = { user: {} };
const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return { ...state };
  }
};

export default reducer;
