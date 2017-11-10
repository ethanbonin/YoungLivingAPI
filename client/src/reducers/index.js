import { combineReducers } from "redux";
import authReducer from "./authReducer";
import prospectsReducer from "./prospectsReducer";
import labelsReducer from "./LabelsReducer";

export default combineReducers({
  auth: authReducer,
  prospects: prospectsReducer,
  labels: labelsReducer
});
