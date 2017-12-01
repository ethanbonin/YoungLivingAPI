import { HEADER_LOCATION } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case HEADER_LOCATION:
      console.log("HEADER_LOCATION", action.payload);
      return action.payload;
    default:
      return state;
  }
}
