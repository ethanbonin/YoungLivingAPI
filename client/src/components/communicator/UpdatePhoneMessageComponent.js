import "./communicatorcss/communicator.css";

import React, { Component } from "react";
import { Message, Input, Button, Label } from "semantic-ui-react";
import TimeZoneDropDown from "./TimeZoneDropDownComponent";

const momentTimeZone = require("moment-timezone");

class UpdatePhoneMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      timeZone: momentTimeZone.tz.guess(),
      error: false,
      error_message: ""
    };
  }

  checkPhone(value) {
    const regex_number = /\b(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})\b/;
    const result_number = regex_number.test(value);
    console.log("reulst", result_number);
    if (!result_number) {
      this.setState({ error: true });
      this.setState({ error_message: "Not a valid phoneNumber. Please Remove any extensions like '1' at the front of the number" });
      return false;
    }

    return true;
  }

  handleUpdateNumberSubmit = value => {
    if (this.state.timeZone === "" || value === "") {
      this.setState({ error: true });
      this.setState({
        error_message: "You must put a phone number and a timezone"
      });
      return;
    }

    let truthy = this.checkPhone(value);
    if (truthy) {
      this.props.handleUpdateNumberSubmit(value, this.state.timeZone);
    }
  };

  handleTimeZoneOption(e, { value }) {
    this.setState({ timeZone: value });
  }

  renderTimeZonesDropDown() {
    return (
      <TimeZoneDropDown
        timeZone={this.state.timeZone}
        handleTimeZoneOption={this.handleTimeZoneOption.bind(this)}
      />
    );
  }

  renderButton() {
    return (
      <Button
        icon="phone"
        color="blue"
        placeholder="303-555-5555"
        content="Submit"
        labelPosition="right"
        onClick={() => this.handleUpdateNumberSubmit(this.state.value)}
      />
    );
  }

  renderInput() {
    return (
      <Input
        className="input_phone_number_message"
        onChange={e => {
          this.setState({ value: e.target.value });
        }}
      >
        <input style={{ textAlign: "center" }} />
        {this.renderTimeZonesDropDown()}
        {this.renderButton()}
      </Input>
    );
  }

  render() {
    return (
      <Message className="update_phone_message" negative>
        <Message.Header>
          Before you can do anything with communicator you must set your number
        </Message.Header>
        {this.state.error ? (
          <Label style={{ marginTop: "1em" }} size="medium" color="red">
            {this.state.error_message}
          </Label>
        ) : null}
        <Message.Content>{this.renderInput()}</Message.Content>
      </Message>
    );
  }
}

export default UpdatePhoneMessage;
