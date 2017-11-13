import React from "react";
import _ from 'lodash';
import { Form, Label } from "semantic-ui-react";


import { info } from "../raw_data";


const PersonalInfo = (data) => {
  return _.map(info, ({ value, label }) => {
    const v = value + "_error";
    const v_format = value + "_error_format";
    return (
      <div style={{ margin: "1em" }} key={value}>
        <Form.Input
          label={label}
          placeholder={label}
          name={value}
          onChange={data.handleChange}
          error={data.info[v]}
          value={data.info[value]}
        />
        {data.info[v] ? (
          <Label basic color="red" pointing>
            Please enter a value
          </Label>
        ) : null}
        {data.info[v_format] ? (
          <Label basic color="red" pointing>
            Please enter the correct format
          </Label>
        ) : null}
      </div>
    );
  });


}


export default PersonalInfo
