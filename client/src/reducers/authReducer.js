import { FETCH_USER, LOGOUT_USER, LOGIN_USER, UPDATE_TERMS_USER } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      if (action.payload.user == null) {
        return false;
      } else {
        return action.payload;
      }
    case LOGOUT_USER:
      return action.payload;
    case LOGIN_USER:
      return action.payload
    case UPDATE_TERMS_USER:
      return action.payload;
    default:
      return state;
  }
}
