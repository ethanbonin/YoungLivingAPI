import { combineReducers } from "redux";
import authReducer from "./authReducer";
import prospectsReducer from "./prospectsReducer";
import labelsReducer from "./LabelsReducer";
import twilioReducer from "./twilioReducer";

export default combineReducers({
  auth: authReducer,
  prospects: prospectsReducer,
  labels: labelsReducer,
  twilio: twilioReducer
});
