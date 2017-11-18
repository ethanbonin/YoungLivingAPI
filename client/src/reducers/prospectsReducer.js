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
      return action.payload;
    case DELETE_PROSPECTS:
      return action.payload;
    case POST_PROSPECTS:
      return action.payload;
    case PATCH_PROSPECTS:
      return action.payload;
    case TOGGLE_PROSPECTS:
      return action.payload;
    case CLOSE_PROSPECTS:
      return action.payload;
    default:
      return state;
  }
}
