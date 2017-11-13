import { Form } from "semantic-ui-react";
import React from "react";
import { address_boxes } from "../raw_data";

import _ from "lodash";

const AddressField = data => {
  return _.map(address_boxes, param => {
    return (
      <Form.TextArea
        {...param}
        value={data.data.address[param["name"]]}
        onChange={data.handleAddressChange}
      />
    );
  });
};


export default AddressField;
