import React from 'react'
import {Label} from "semantic-ui-react";

const AddressBar = (data) => {
  console.log(data.data.address);
  if (data.data.address !== undefined) {
    return (
      <Label className="address_modal_label" size="large">
        {data.data.address.address1}, {data.data.address.address2},{" "}
        {data.data.address.city}, {data.data.address.state},{" "}
        {data.data.address.zip}
      </Label>
    );
  }else {
    return null
  }
}


export default AddressBar
