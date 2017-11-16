import React, { Component } from "react";
import moment from "moment";
import InputMoment from "input-moment";
import { Dimmer, Header, Transition } from "semantic-ui-react";
import "input-moment/dist/input-moment.css";
import "./datepicker.css";
var ObjectID = require("bson-objectid");

class InputDate extends Component {
  constructor(props) {
    super(props);
    if (props.edit) {
      this.state = {
        _id: props.reminder._id,
        m: moment(props.reminder.time),
        reminderMessage: props.reminder.reminderMessage,
        dimmer: false,
        edit: props.edit
      };
    } else {
      this.state = {
        _id: ObjectID.generate(),
        m: moment(),
        reminderMessage: "",
        dimmer: false,
        edit: props.edit
      };
    }
  }

  handleChange = m => {
    this.setState({ m });
  };

  handleSave = () => {
    this.props.handleCallBackReminder(
      this.state._id,
      this.state.m.format(),
      this.state.reminderMessage
    );
    this.setState({ reminderMessage: "" });
    this.setState({ dimmer: true });
    setTimeout(
      function() {
        this.setState({ dimmer: false });
      }.bind(this),
      2000
    );
  };

  renderDimmer() {
    const content = (
      <div>
        <Header as="h2" inverted>
          Reminder Saved
        </Header>
      </div>
    );
    return (
      <Transition visible={this.state.dimmer} animation="fade" duration={500}>
        <Dimmer active={this.state.dimmer} size="medium">
          {content}
        </Dimmer>
      </Transition>
    );
  }

  renderHeader() {
    let reminderHeader = "Create a Reminder";
    let reminderHeader3 = "Write a reminder Message and set the date";
    if (!this.state.edit) {
      return (
        <div>
          <h1>{reminderHeader}</h1>
          <h3>{reminderHeader3}</h3>
        </div>
      );
    }
    return null;
  }

  render() {
    const style = {
      width: "100%"
    };
    if (this.state.edit) {
      style.width = "";
    }

    return (
      <div className="app">
        {this.renderDimmer()}
        {this.renderHeader()}
        <input
          placeholder="Reminder Message Here"
          value={this.state.reminderMessage}
          onChange={e => this.setState({ reminderMessage: e.target.value })}
        />
        <div className="input">
          <input type="text" value={this.state.m.format("llll")} readOnly />
        </div>
        <InputMoment
          style={style}
          className={"options"}
          moment={this.state.m}
          onChange={this.handleChange}
          minStep={5}
          onSave={this.handleSave.bind(this)}
        />
      </div>
    );
  }
}

export default InputDate;
