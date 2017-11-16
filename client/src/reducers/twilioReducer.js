import { POST_REMINDER, FETCH_REMINDERS } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case POST_REMINDER:
      console.log("POST_REMINDER", action.payload);
      return action.payload;
    case FETCH_REMINDERS:
      console.log("FETCH_REMINDER", action.payload);
      return action.payload;
    default:
      return state;
  }
}
