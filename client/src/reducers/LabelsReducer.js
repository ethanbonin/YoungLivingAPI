import { FETCH_LABELS } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_LABELS:
      console.log("FETCH_LABELS", action.payload);
      return action.payload;
    default:
      return state;
  }
}
