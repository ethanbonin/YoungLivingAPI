import { combineReducers } from "redux";
import authReducer from "./authReducer";
import prospectsReducer from "./prospectsReducer";



export default combineReducers({
  auth: authReducer,
  prospects: prospectsReducer
});
