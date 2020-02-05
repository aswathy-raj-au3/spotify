import { combineReducers } from "redux";
import userReducer from "./userReducer";
import tokenReducer from "./tokenReducer";
import {songsReducer} from "./songsReducer";
import artistsReducer from "./artistsReducer";
import uiReducer from "./uiReducer";
import browseReducer from "./browseReducer";

export default combineReducers({
  tokenReducer,
  userReducer,
  songsReducer,
  artistsReducer,
  uiReducer,
  browseReducer
});
