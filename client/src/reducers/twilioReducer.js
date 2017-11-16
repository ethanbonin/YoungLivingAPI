import { POST_REMINDER, FETCH_REMINDERS, DELETE_REMINDER } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case POST_REMINDER:
      console.log("POST_REMINDER", action.payload);
      return action.payload;
    case FETCH_REMINDERS:
      console.log("FETCH_REMINDER", action.payload);
      return action.payload;
    case DELETE_REMINDER:
      console.log("DELETE_REMINDER", action.payload);
      return action.payload;
    default:
      return state;
  }
}
