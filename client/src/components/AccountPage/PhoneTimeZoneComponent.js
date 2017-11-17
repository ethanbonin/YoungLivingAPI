import React from "react";
import { Icon, Label, Segment, Grid } from "semantic-ui-react";
import "./accountcss/account.css";
import PhoneEditPopUp from "./PopUpPhoneNumberEditComponent";
import TimeZoneEditPopUp from "./PopUpTimeZone/PopUpTimeZoneEditComponent";

const PhoneZone = props => {
  function formatPhoneNumber(s) {
    var s2 = ("" + s).replace(/\D/g, "");
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return !m ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  }

  return (
    <Segment>
      <Segment style={{ textAlign: "center" }}>
        <h2>Contact Information</h2>
      </Segment>
      <Grid>
        <div>
          <Label className="phoneNumber" size="massive">
            <Icon name="phone" />
            Phone Number: {formatPhoneNumber(props.phoneNumber)}
            <PhoneEditPopUp
              handleUpdate={(phoneNumber, timeZone) =>
                props.handleUpdate(phoneNumber, timeZone)}
              phoneNumber={props.phoneNumber}
            />
          </Label>
          <Label
            className="timeZone"
            style={{ marginTop: "0.5em", marginBottom: "1em" }}
            size="massive"
          >
            <Icon name="time" />
            Time Zone: {props.timeZone}
            <TimeZoneEditPopUp
              handleUpdate={(phoneNumber, timeZone) =>
                props.handleUpdate(phoneNumber, timeZone)}
              timeZone={props.timeZone}
            />
          </Label>
        </div>
      </Grid>
    </Segment>
  );
};

export default PhoneZone;
