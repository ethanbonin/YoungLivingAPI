import { FETCH_PROSPECTS } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_PROSPECTS:
      console.log(FETCH_PROSPECTS, action.payload);
      return action.payload;
    default:
      return state;
  }
}
