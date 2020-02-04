import { combineReducers } from "redux";
import userReducer from "./userReducer";
import tokenReducer from "./tokenReducer";
import uiReducer from "./uiReducer";
import artistsReducer from "./artistsReducer";
import songsReducer from "./songsReducer";
import browseReducer from "./browseReducer";

export default combineReducers({
  userReducer,
  tokenReducer,
  uiReducer,
  artistsReducer,
  songsReducer,
  browseReducer
});
