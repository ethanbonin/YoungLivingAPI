import { FETCH_LABELS,UPDATE_LABELS } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_LABELS:
      console.log("FETCH_LABELS", action.payload);
      state = action.payload;
      return action.payload;
    case UPDATE_LABELS:
      console.log("THe state", state);
      console.log("Update,", {prospectLabels: [action.payload]})
      return {prospectlabels: [action.payload]};
    default:
      return state;
  }
}
