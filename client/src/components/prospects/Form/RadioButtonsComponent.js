import React from "react";
import _ from "lodash";
import { lead } from "../raw_data";

const RadioButtons = data => {
  return _.map(lead, ({ value, label }) => {
    return (
      <p key={value}>
        <input
          name="group1"
          type="radio"
          id={value}
          onChange={data.handleRadioChange}
        />
        <label htmlFor={value}>{label}</label>
      </p>
    );
  });
};

export default RadioButtons;
