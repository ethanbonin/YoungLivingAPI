import axios from "axios";
import { FETCH_USER, FETCH_PROSPECTS, DELETE_PROSPECTS, POST_PROSPECTS } from "./types";

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


export const deleteProspects = (_id) => {
  console.log("ID IS", _id);
  return function(dispatch) {
    axios
      .delete("/v0/yl/prospects/delete", {data:{_id}})
      .then(res => dispatch({ type: DELETE_PROSPECTS, payload: res.data}));
  };
};


export const postProspects = (body) => {
  console.log("THE BODY",body);
  return function(dispatch) {
    axios
      .post("/v0/yl/prospect_new", {values: body})
      .then(res => {
        dispatch({ type: POST_PROSPECTS, payload: res.data});
        console.log("Redirecting");
      });
  };
};


// export const handleToken = token => async dispatch => {
//   const res = await axios.post('/api/stripe', token);
//   dispatch({ type: FETCH_USER, payload: res.data });
// };
