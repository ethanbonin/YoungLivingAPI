import axios from "axios";
import { FETCH_USER, FETCH_PROSPECTS } from "./types";

//SAME THING AS BELOW
// export const fetchUser = () => async dispatch => {
//   const res = await axios.get("/api/current_user");
//   dispatch({ type: FETCH_USER, payload: res.data });
// };

// export default fetchUser;

//ORIGINAL
export const fetchUser = () => {
  return function(dispatch) {
    axios
      .get("/v0/yl/current_user/")
      .then(res => dispatch({ type: FETCH_USER, payload: res.data}));
  };
};

export const fetchProspects = () => {
  return function(dispatch) {
    axios
      .get("/v0/yl/prospects")
      .then(res => dispatch({ type: FETCH_PROSPECTS, payload: res.data}));
  };
};


// export const handleToken = token => async dispatch => {
//   const res = await axios.post('/api/stripe', token);
//   dispatch({ type: FETCH_USER, payload: res.data });
// };
