import React, { Component } from "react";
import { Form, Checkbox, Segment, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { connect } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";

class FormDataModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      met_date: moment(),
      first: this.props.data.first,
      last: this.props.data.last,
      email: this.props.data.email,
      phone: this.props.data.phone,
      first_call: this.props.data.first_call,
      mail_sample: this.props.data.mail_sample,
      follow_up: this.props.data.follow_up,
      invite_to_class: this.props.data.invite_to_class,
      add_facebook_group: this.props.data.add_facebook_group,
      texting_marketing: this.props.data.texting_marketing,
      host_a_class: this.props.data.host_a_class,
      know_them: this.props.data.know_them,
      health_needs: this.props.data.health_needs,
      family: this.props.data.family,
      occupation: this.props.data.occupation,
      recreation: this.props.data.recreation,
      additional_notes: this.props.data.additional_notes,
      closedDeal: this.props.data.closedDeal
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleChange = (e, { name, value }) => {
    console.log(name, value);
    this.setState({ [name]: value });
    console.log(this.state);
  };

  toggle = (e, { name }) => {
    const truthy = !this.state[name];
    this.setState({ [name]: truthy });
  };

  handleDateChange(date) {
    console.log(typeof date);
    this.setState({
      met_date: date
    });
  }

  handleSubmit = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div style={{ marginTop: "3em", marginLeft: "1em", marginRight: "1em" }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              label="First name"
              placeholder="First name"
              name="first"
              value={this.props.data.first}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Last name"
              placeholder="Last name"
              name="last"
              value={this.props.data.last}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Email"
              placeholder="example@example.com"
              name="email"
              value={this.props.data.email}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Phone Number"
              placeholder="555-555-555"
              name="phone"
              value={this.props.data.phone}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field width={5}>
              <label>Date that you met</label>
              <DatePicker
                selected={this.state.met_date}
                onChange={this.handleDateChange}
              />
            </Form.Field>
            <div style={{ marginTop: "21px" }}>
              <Segment compact>
                <Label basic color="blue">
                  First Call
                </Label>
                <Checkbox
                  name={"first_call"}
                  onChange={this.toggle}
                  checked={this.state.first_call}
                />
                <Label basic color="blue">
                  Mail Sample
                </Label>
                <Checkbox
                  name={"mail_sample"}
                  onChange={this.toggle}
                  checked={this.state.mail_sample}
                />
                <Label basic color="blue">
                  Follow Up
                </Label>
                <Checkbox
                  name={"follow_up"}
                  onChange={this.toggle}
                  checked={this.state.follow_up}
                />
                <Label basic color="blue">
                  Invite to Class
                </Label>
                <Checkbox
                  name={"invite_to_class"}
                  onChange={this.toggle}
                  checked={this.state.invite_to_class}
                />
              </Segment>
            </div>
          </Form.Group>
          <Form.Group>
            <div style={{ margin: "auto auto" }}>
              <Segment compact>
                <Label basic color="blue">
                  Add to Facebook Group
                </Label>
                <Checkbox
                  name={"add_facebook_group"}
                  onChange={this.toggle}
                  checked={this.state.add_facebook_group}
                />
                <Label basic color="blue">
                  Add to Texting{" "}
                </Label>
                <Checkbox
                  name={"texting_marketing"}
                  onChange={this.toggle}
                  checked={this.state.texting_marketing}
                />
                <Label basic color="blue">
                  Will Host a Class
                </Label>
                <Checkbox
                  name={"host_a_class"}
                  onChange={this.toggle}
                  checked={this.state.host_a_class}
                />
              </Segment>
            </div>
          </Form.Group>

          <Form.TextArea
            label="How do you know them?"
            placeholder="I met them at Whole Foods Market...."
            value={this.state.know_them}
          />
          <Form.TextArea
            label="Health Needs"
            placeholder="Very anxious and sneezy..."
            value={this.state.health_needs}
          />
          <Form.TextArea
            label="Family"
            placeholder="They have 11 kids, two dogs and 4 cats..."
            value={this.state.family}
          />
          <Form.TextArea
            label="Occupation"
            placeholder="Retired..."
            value={this.state.occupation}
          />
          <Form.TextArea
            label="Recreation"
            placeholder="Their hobbies include swimming and sky diving on a normal basis..."
            value={this.state.recreation}
          />
          <Form.TextArea
            label="Additional Notes"
            placeholder="Totally forgot to add a note about this..."
            value={this.state.additional_notes}
          />
        </Form>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(FormDataModal);
