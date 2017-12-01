import { combineReducers } from "redux";
import authReducer from "./authReducer";
import prospectsReducer from "./prospectsReducer";
import labelsReducer from "./LabelsReducer";
import twilioRemindersReducer from "./twilioRemindersReducer";
import headerReducer from './headerReducer';

export default combineReducers({
  auth: authReducer,
  prospects: prospectsReducer,
  labels: labelsReducer,
  twilio: twilioRemindersReducer,
  header: headerReducer
});
