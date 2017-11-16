import React, { Component } from "react";
import moment from "moment";
import InputMoment from "input-moment";
import { Dimmer, Header, Transition } from "semantic-ui-react";
import "input-moment/dist/input-moment.css";
import "./datepicker.css";

class InputDate extends Component {
  state = {
    m: moment(),
    reminderMessage: "",
    dimmer: false
  };

  handleChange = m => {
    this.setState({ m });
  };

  handleSave = () => {
    this.props.handleCallBackReminder(
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
          Saved Reminder
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

  render() {
    return (
      <div className="app">
        {this.renderDimmer()}
        <h1>Create a Reminder</h1>
        <h3>Write a reminder Message and set the date</h3>
        <input
          placeholder="Reminder Message Here"
          value={this.state.reminderMessage}
          onChange={e => this.setState({ reminderMessage: e.target.value })}
        />
        <div className="input">
          <input type="text" value={this.state.m.format("llll")} readOnly />
        </div>
        <InputMoment
          style={{ width: "100%" }}
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
