import React from "react";
import { box_values } from "../raw_data";
import _ from "lodash";

const Checkboxes = (data) => {
  return _.map(box_values, ({ value, message }) => {
    return (
      <p key={value}>
        <input
          type="checkbox"
          id={value}
          name={value}
          onChange={data.toggle}
          checked={data.data[value]}
        />
        <label htmlFor={value}>{message}</label>
      </p>
    );
  });
}

export default Checkboxes;
