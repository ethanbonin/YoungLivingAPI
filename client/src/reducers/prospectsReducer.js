import {
  FETCH_PROSPECTS,
  DELETE_PROSPECTS,
  POST_PROSPECTS,
  PATCH_PROSPECTS,
  TOGGLE_PROSPECTS,
  CLOSE_PROSPECTS
} from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_PROSPECTS:
      console.log(FETCH_PROSPECTS, action.payload);
      return action.payload;
    case DELETE_PROSPECTS:
      console.log("DELETED", action.payload);
      return action.payload;
    case POST_PROSPECTS:
      console.log("POSTED", action.payload);
      return action.payload;
    case PATCH_PROSPECTS:
      console.log("PATCHED", action.payload);
      return action.payload;
    case TOGGLE_PROSPECTS:
      console.log("TOGGLE", action.payload);
      return action.payload;
    case CLOSE_PROSPECTS:
      console.log("CLOSE", action.payload);
      return action.payload;
    default:
      return state;
  }
}
