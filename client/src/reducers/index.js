import { combineReducers } from "redux";
import authReducer from "./authReducer";
import prospectsReducer from "./prospectsReducer";
import labelsReducer from "./LabelsReducer";
import twilioRemindersReducer from "./twilioRemindersReducer";

export default combineReducers({
  auth: authReducer,
  prospects: prospectsReducer,
  labels: labelsReducer,
  twilio: twilioRemindersReducer
});
