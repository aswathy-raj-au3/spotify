import { combineReducers } from "redux";
// import userReducer from "./userReducer";
import tokenReducer from "./tokenReducer";
import {songsReducer} from "./songsReducer";

export default combineReducers({
  tokenReducer,
  songsReducer
});
