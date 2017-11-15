import React, { Component } from "react";
import moment from "moment";
import InputMoment from "input-moment";
import 'input-moment/dist/input-moment.css'
import './datepicker.css'


class InputDate extends Component {
  state = {
    m: moment(),
    reminderMessage: ""
  };

  handleChange = m => {
    this.setState({ m });
  };

  handleSave = () => {
    this.props.handleCallBackReminder(this.state.m.format(), this.state.reminderMessage);
  };

  render() {
    return (
      <div className="app">
        <h1>
          Create a Reminder
        </h1>
        <h3>Write a reminder Message and set the date</h3>
        <input placeholder="Reminder Message Here" onChange={(e) => this.setState({reminderMessage: e.target.value})}/>
          <div className="input">
            <input type="text" value={this.state.m.format('llll')} readOnly />
          </div>
          <InputMoment
            style={{width:'100%'}}
            className={'options'}
            moment={this.state.m}
            onChange={this.handleChange}
            minStep={5}
            onSave={this.handleSave}
          />
      </div>
    );
  }
}

export default InputDate;
