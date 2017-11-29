import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import TimeZoneDropDown from "../../communicator/TimeZoneDropDownComponent";

const momentTimeZone = require("moment-timezone");


class DropDownTimeZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeZone: momentTimeZone.tz.guess(),
    };
  }

  handleTimeZoneOption(value) {
    this.setState({ timeZone: value});
    let phoneNumber = ""
    if (this.props.auth.user.user.phoneNumber !== undefined){
      phoneNumber = this.props.auth.user.user.phoneNumber;
    }
    this.props.handleUpdate(phoneNumber, value);
    this.props.updatePhoneNumer(phoneNumber, value);
  }

  render() {
    return (
      <TimeZoneDropDown
        timeZone={this.state.timeZone}
        handleTimeZoneOption={this.handleTimeZoneOption.bind(this)}
      />
    );
  }
}


function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(DropDownTimeZone);
