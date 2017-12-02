import React, { Component } from "react";
import moment from "moment";
import {
  Dimmer,
  Header,
  Transition,
  Button,
  Segment,
  Label,
  Divider,
  Message
} from "semantic-ui-react";
import "input-moment/dist/input-moment.css";
import "./datepicker.css";

import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";

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
        edit: props.edit,
        selectedDay: null
      };
    } else {
      this.state = {
        _id: ObjectID.generate(),
        m: moment(),
        reminderMessage: "",
        dimmer: false,
        edit: props.edit,
        selectedDay: null,
        selectDateMessage: ""
      };
    }
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  handleSave = () => {
    this.props.handleCallBackReminder(
      this.state._id,
      this.state.m.format(),
      this.state.reminderMessage
    );
    this.setState({ reminderMessage: "" });
    this.setState({ _id: ObjectID.generate() });
    this.setState({ m: moment() });
    this.setState({ dimmer: true });
    setTimeout(
      function() {
        this.setState({ dimmer: false });
      }.bind(this),
      2000
    );
  };

  handleDayClick(day_picked, { selected }) {
    let date_time_picked = this.state.m;
    let moment_year_month_day = moment(day_picked);
    let year = moment_year_month_day.year();
    let month = moment_year_month_day.month();
    let day = moment_year_month_day.date();
    date_time_picked
      .year(year)
      .month(month)
      .date(day);
    this.setState({
      m: date_time_picked,
      selectDateMessage: date_time_picked.format("llll")
    });
    this.setState({
      selectedDay: selected ? undefined : day_picked
    });
  }

  handleTimeChange(value) {
    if (value !== null) {
      let date_time_picked = this.state.m;
      date_time_picked.hour(value.hour());
      date_time_picked.minute(value.minute());
      this.setState({
        m: date_time_picked,
        selectDateMessage: date_time_picked.format("llll")
      });
    }
  }

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

  renderDatePicker() {
    return (
      <Segment>
        <Label size="big" color="grey" className="reminder_text">
          Select Date
        </Label>
        <div className="date_picker_div">
          <DayPicker
            selectedDays={this.state.selectedDay}
            onDayClick={this.handleDayClick}
          />
          <p>
            {this.state.selectedDay
              ? this.state.selectedDay.toLocaleDateString()
              : "Please select a day 👻"}
          </p>
        </div>
      </Segment>
    );
  }

  renderTimePicker() {
    return (
      <Segment>
        <Label size="big" color="grey" className="reminder_text">
          Select Time
        </Label>
        <Divider />
        <TimePicker
          focusOnOpen={true}
          showSecond={false}
          defaultValue={moment()
            .hour(0)
            .minute(0)}
          className="time_picker "
          onChange={this.handleTimeChange.bind(this)}
          format={"h:mm a"}
          use12Hours
        />
      </Segment>
    );
  }

  renderDateMessage() {
    if (this.state.selectDateMessage !== "") {
      return (
        <Message info className="date_message">
          <Message.Content>The date you have chosen is: </Message.Content>
          <Message.Header>{this.state.selectDateMessage}</Message.Header>
        </Message>
      );
    } else {
      return null;
    }
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
        <Segment>
          <input
            placeholder="Reminder Message Here"
            value={this.state.reminderMessage}
            onChange={e => this.setState({ reminderMessage: e.target.value })}
          />
        </Segment>
        {this.renderDatePicker()}
        {this.renderTimePicker()}
        {this.renderDateMessage()}
        <Button
          size="large"
          color="blue"
          icon="check"
          content={"SAVE"}
          className="save_button"
          onClick={this.handleSave.bind(this)}
        />
      </div>
    );
  }
}

export default InputDate;
