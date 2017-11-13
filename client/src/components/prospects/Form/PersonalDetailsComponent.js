import { Form } from "semantic-ui-react";
import React from "react";
import { details } from "../raw_data";
import _ from "lodash";


const PersonalDetails = (data) => {
  return _.map(details, ({ key, value, label, placeholder }) => {
    return (
      <Form.TextArea
        label={label}
        placeholder={placeholder}
        name={value}
        onChange={data.handleChange}
        key={key}
        value={data.data[value]}
      />
    );
  });
}


export default PersonalDetails;
