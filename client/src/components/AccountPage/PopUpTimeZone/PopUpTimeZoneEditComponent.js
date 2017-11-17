import React from "react";
import { Popup, Button } from "semantic-ui-react";
import DropDownTimeZone from "./DropDownTimeZone";
import "../accountcss/account.css";

const TimeZoneEditPopUp = props => {
  return (
    <Popup
      trigger={<Button color="grey" style={{ float: "right" }} icon="edit" />}
      content={
        <DropDownTimeZone
          handleUpdate={(phoneNumber, timeZone) =>
            props.handleUpdate(phoneNumber, timeZone)}
        />
      }
      on="click"
      position="bottom center"
    />
  );
};

export default TimeZoneEditPopUp;
