import { POST_REMINDER } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case POST_REMINDER:
      console.log("POST_REMINDER", action.payload);
      return action.payload;
    default:
      return state;
  }
}
