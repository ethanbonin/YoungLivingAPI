import axios from "axios";
import {
  FETCH_USER,
  LOGOUT_USER,
  LOGIN_USER,
  UPDATE_TERMS_USER,
  FETCH_PROSPECTS,
  DELETE_PROSPECTS,
  POST_PROSPECTS,
  PATCH_PROSPECTS,
  TOGGLE_PROSPECTS,
  CLOSE_PROSPECTS,
  FETCH_LABELS,
  UPDATE_LABELS,
  POST_REMINDER,
  FETCH_REMINDERS,
  DELETE_REMINDER,
  EDIT_REMINDER
} from "./types";

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
      .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
  };
};

export const loginUser = body => {
  return function(dispatch) {
    axios
      .post("/v0/yl/login/", body)
      .then(res => dispatch({ type: LOGIN_USER, payload: res.data }));
  };
};

export const logoutUser = () => {
  return function(dispatch) {
    axios
      .get("/v0/yl/logout/")
      .then(res => dispatch({ type: LOGOUT_USER, payload: res.data }));
  };
};

export const updateTerms = () => {
  return function(dispatch) {
    axios
      .get("/v0/yl/update_terms")
      .then(res => dispatch({ type: UPDATE_TERMS_USER, payload: res.data }));
  };
};

export const fetchProspects = () => {
  return function(dispatch) {
    axios
      .get("/v0/yl/prospects")
      .then(res => dispatch({ type: FETCH_PROSPECTS, payload: res.data }));
  };
};

export const deleteProspects = _id => {
  return function(dispatch) {
    axios
      .delete("/v0/yl/prospects/delete", { data: { _id } })
      .then(res => dispatch({ type: DELETE_PROSPECTS, payload: res.data }));
  };
};

export const postProspects = body => {
  return function(dispatch) {
    axios.post("/v0/yl/prospect_new", { values: body }).then(res => {
      dispatch({ type: POST_PROSPECTS, payload: res.data });
    });
  };
};

export const patchProspects = messsage => {
  return function(dispatch) {
    axios.patch("/v0/yl/prospects/update", { message: messsage }).then(res => {
      dispatch({ type: PATCH_PROSPECTS, payload: res.data });
    });
  };
};

export const toggleProspects = toggle => {
  return function(dispatch) {
    axios.patch("/v0/yl/prospects/toggle", { toggle: toggle }).then(res => {
      dispatch({ type: TOGGLE_PROSPECTS, payload: res.data });
    });
  };
};

export const closeProspects = prospect => {
  return function(dispatch) {
    axios
      .patch("/v0/yl/prospects/close_deal", { closed: prospect })
      .then(res => {
        dispatch({ type: CLOSE_PROSPECTS, payload: res.data });
      });
  };
};

export const fetchLabels = () => {
  return function(dispatch) {
    axios
      .get("/v0/yl/prospect_labels/")
      .then(res => dispatch({ type: FETCH_LABELS, payload: res.data }));
  };
};

export const updateLabels = (_id, body) => {
  return function(dispatch) {
    axios
      .post("/v0/yl/prospect_labels_update", { values: body, _id: _id })
      .then(res => dispatch({ type: UPDATE_LABELS, payload: res.data }));
  };
};

export const updatePhoneNumer = (phoneNumber, timeZone) => {
  return function(dispatch) {
    axios
      .post("/v0/yl/updatePhoneNumber", {
        phoneNumber: phoneNumber,
        timeZone: timeZone
      })
      .then(res => {
        axios
          .get("/v0/yl/current_user/")
          .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
      });
  };
};

export const createReminder = reminder => {
  return function(dispatch) {
    axios.post("/v0/yl/reminder/create", reminder).then(res => {
      dispatch({ type: POST_REMINDER, payload: res.data });
    });
  };
};

export const fetchReminders = () => {
  return function(dispatch) {
    axios.get("/v0/yl/reminder/").then(res => {
      dispatch({ type: FETCH_REMINDERS, payload: res.data });
    });
  };
};

export const deleteReminder = reminder => {
  const _id = reminder._id;
  return function(dispatch) {
    axios
      .delete("/v0/yl/reminder/delete", { data: { _id } })
      .then(res => dispatch({ type: DELETE_REMINDER, payload: res.data }));
  };
};

export const editReminder = reminder => {
  console.log("the reminder", reminder);
  return function(dispatch) {
    axios
      .patch("/v0/yl/reminder/update", reminder)
      .then(res => dispatch({ type: EDIT_REMINDER, payload: res.data }));
  };
};

// export const handleToken = token => async dispatch => {
//   const res = await axios.post('/api/stripe', token);
//   dispatch({ type: FETCH_USER, payload: res.data });
// };
