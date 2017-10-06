import React, { Component } from "react";
import { Form, Segment, Button, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Redirect } from "react-router";
import _ from "lodash";
import "react-datepicker/dist/react-datepicker.css";
import { box_values, info, lead, details } from "./raw_data";

class ProspectsNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      met_date: moment(),
      first: "",
      last: "",
      email: "",
      phone: "",
      invite_to_class: false,
      add_facebook_group: false,
      texting_marketing: false,
      host_a_class: false,
      know_them: "",
      lead: "cold",
      health_needs: "",
      family: "",
      occupation: "",
      recreation: "",
      additional_notes: {},
      closedDeal: "",
      first_error: false,
      last_error: false,
      email_error: false,
      phone_error: false,
      email_error_format: false,
      phone_error_format: false,
      goBack: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.renderPersonalInfo = this.renderPersonalInfo.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  toggle = e => {
    const truthy = !this.state[e.target.id];
    this.setState({ [e.target.id]: truthy });
  };

  handleDateChange(date) {
    this.setState({
      met_date: date
    });
  }

  handleSubmit = () => {
    console.log("Submitting", this.state);

    var error_in_form = false;

    for (var key in info){
      let error_value = info[key].value + "_error"
      if (this.state[info[key].value] === ""){
        error_in_form = true
        this.setState({[error_value]: true})
        console.log(this.state[error_value]);
      }
    }

    if (error_in_form){
      console.log(this.state);
      console.log("Found a field empy!");
      return
    }

    const regex_email = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/
    const regex_number = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/
    const result_email = regex_email.test(this.state.email);
    const result_number = regex_number.test(this.state.phone);
    if (!result_email || !result_number){
      console.log("EMAIL", !result_email);
      console.log("PHONE", !result_number);
      this.setState({email_error_format: !result_email});
      this.setState({phone_error_format: !result_number});
      return
    }

    this.props.postProspects(this.state);
    this.setState({
      goBack: true
    });
    this.props.fetchProspects();
  };

  renderCheckBoxes() {
    return _.map(box_values, ({ value, message }) => {
      return (
        <p key={value}>
          <input
            type="checkbox"
            id={value}
            name={value}
            onChange={this.toggle}
          />
          <label htmlFor={value}>{message}</label>
        </p>
      );
    });
  }

  renderPersonalInfo() {
    return _.map(info, ({ value, label }) => {
      const v = value + "_error";
      const v_format = value + "_error_format";
      return (
        <div style={{margin: "1em"}}>
        <Form.Input
          label={label}
          placeholder={label}
          name={value}
          onChange={this.handleChange}
          error={this.state[v]}
        />
        {this.state[v] ?   <Label basic color='red' pointing>Please enter a value</Label> : null}
        {this.state[v_format] ?  <Label basic color='red' pointing>Please enter the correct format</Label> : null}
      </div>
      );
    });
  }

  renderRadioButtons() {
    return _.map(lead, ({ value, label }) => {
      const v = value;
      return (
        <p>
          <input
            name="group1"
            type="radio"
            id={value}
            onChange={() => this.setState({ lead: v })}
          />
          <label htmlFor={value}>{label}</label>
        </p>
      );
    });
  }

  renderPersonalDetails() {
    return _.map(details, ({ value, label, placeholder }) => {
      return (
        <Form.TextArea
          label={label}
          placeholder={placeholder}
          name={value}
          onChange={this.handleChange}
        />
      );
    });
  }

  render() {
    return (
      <Segment
        style={{ marginTop: "3em", marginLeft: "6em", marginRight: "6em" }}
      >
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">
              {this.renderPersonalInfo()}
            </Form.Group>
            <Form.Field width={4}>
              <label>Date that you met</label>
              <DatePicker
                selected={this.state.met_date}
                onChange={this.handleDateChange}
              />
            </Form.Field>
            <Segment>
              <label>LEAD</label>
              {this.renderRadioButtons()}
            </Segment>
            <Segment>{this.renderCheckBoxes()}</Segment>
            {this.renderPersonalDetails()}
            <Form.Group>
              <div style={{ margin: "auto auto" }}>
                <Button.Group>
                  <Button href="/dashboard/prospects">Cancel</Button>
                  <Button.Or />
                  <Button color="teal" positive>
                    Save
                  </Button>
                </Button.Group>
              </div>
            </Form.Group>
          </Form>
          {this.state.goBack ? (
            <Redirect push to="/dashboard/prospects" />
          ) : null}
        </div>
      </Segment>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(ProspectsNew);
