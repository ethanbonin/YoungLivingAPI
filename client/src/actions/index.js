import axios from "axios";
import { FETCH_USER, FETCH_PROSPECTS, DELETE_PROSPECTS, POST_PROSPECTS, PATCH_PROSPECTS, TOGGLE_PROSPECTS, CLOSE_PROSPECTS } from "./types";

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
  return function(dispatch) {
    axios
      .delete("/v0/yl/prospects/delete", {data:{_id}})
      .then(res => dispatch({ type: DELETE_PROSPECTS, payload: res.data}));
  };
};


export const postProspects = (body) => {
  return function(dispatch) {
    axios
      .post("/v0/yl/prospect_new", {values: body})
      .then(res => {
        dispatch({ type: POST_PROSPECTS, payload: res.data});
      });
  };
};


export const patchProspects = (messsage) => {
  return function(dispatch) {
    axios
      .patch("/v0/yl/prospects/update", {message: messsage})
      .then(res => {
        dispatch({ type: PATCH_PROSPECTS, payload: res.data});
      });
  };
};

export const toggleProspects = (toggle) => {
  return function(dispatch) {
    axios
      .patch("/v0/yl/prospects/toggle", {toggle: toggle})
      .then(res => {
        dispatch({ type: TOGGLE_PROSPECTS, payload: res.data});
      });
  };
};


export const closeProspects = (prospect) => {
  return function(dispatch) {
    axios
      .patch("/v0/yl/prospects/close_deal", {closed: prospect})
      .then(res => {
        dispatch({ type: CLOSE_PROSPECTS, payload: res.data});
      });
  };
};




// export const handleToken = token => async dispatch => {
//   const res = await axios.post('/api/stripe', token);
//   dispatch({ type: FETCH_USER, payload: res.data });
// };
