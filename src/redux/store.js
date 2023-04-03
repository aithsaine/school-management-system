
import { legacy_createStore } from "redux";
import { mainReducer } from "./reducers/mainReducer";


export const store = legacy_createStore(mainReducer)