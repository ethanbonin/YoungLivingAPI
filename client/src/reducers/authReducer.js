import { FETCH_USER, LOGOUT_USER, LOGIN_USER, UPDATE_TERMS_USER, UPDATE_PHONE } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      if (action.payload.user == null) {
        return false;
      } else {
        console.log("FETCHING USER", action.payload);
        return action.payload;
      }
    case LOGOUT_USER:
      return action.payload;
    case LOGIN_USER:
      return action.payload
    case UPDATE_TERMS_USER:
      return action.payload;
    case UPDATE_PHONE:
      console.log("UPDATE_PHONE", action.payload);
      return action.payload;
    default:
      return state;
  }
}
