import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
const momentTimeZone = require("moment-timezone");

class DropDownTimeZone extends Component {
  constructor(props) {
    super(props);
    let timeZones = [];
    momentTimeZone.tz.names().forEach(timeZone => {
      timeZones.push({
        key: timeZone,
        value: timeZone,
        text: timeZone
      });
    });

    this.state = {
      timeZone: momentTimeZone.tz.guess(),
      timeZones: timeZones,
    };
  }

  handleTimeZoneOption(e, { value }) {
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
      <Dropdown
        placeholder="Time Zones"
        search
        selection
        value={this.state.timeZone}
        options={this.state.timeZones}
        onChange={this.handleTimeZoneOption.bind(this)}
      />
    );
  }
}


function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(DropDownTimeZone);
