import React from "react";
import { Redirect } from "react-router";


const RedirectComponent = (data) => {
  let truthy = data.truthy
  let notes;
  if (data.data.old_notes !== undefined) {
    notes = data.data.old_notes;
  } else {
    notes = { date: new Date(), message: data.data.additional_notes };
  }
  if (truthy) {
    return (
      <Redirect
        push
        to={{
          pathname: "/dashboard/prospects",
          state: {
            ...data.data,
            met_date: data.data.met_date.format(),
            additional_notes: notes
          }
        }}
      />
    );
  }
  return null;
}


export default RedirectComponent
