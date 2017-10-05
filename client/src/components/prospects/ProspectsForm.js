import React, { Component } from "react";
import { Form, Checkbox, Segment, Label, Button } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Redirect } from 'react-router'


import "react-datepicker/dist/react-datepicker.css";

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
      health_needs: "",
      family: "",
      occupation: "",
      recreation: "",
      additional_notes: {},
      closedDeal: "",
      goBack: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  toggle = (e, { name }) => {
    const truthy = !this.state[name];
    this.setState({ [name]: truthy });
  };

  handleDateChange(date) {
    this.setState({
      met_date: date
    });
  }

  handleSubmit = () => {
    this.props.postProspects(this.state);
    this.setState({
      goBack: true
    });
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
              onChange={this.handleChange}
            />
            <Form.Input
              label="Last name"
              placeholder="Last name"
              name="last"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Email"
              placeholder="example@example.com"
              name="email"
              onChange={this.handleChange}
            />
            <Form.Input
              label="Phone Number"
              placeholder="555-555-555"
              name="phone"
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
            <Segment compact>
            <Label basic color="blue">
              Invite to Class
            </Label>
            <Checkbox name={"invite_to_class"} onChange={this.toggle} />
              <Label basic color="blue">
                Add to Facebook Group
              </Label>
              <Checkbox name={"add_facebook_group"} onChange={this.toggle} />
              <Label basic color="blue">
                Add to Texting{" "}
              </Label>
              <Checkbox name={"texting_marketing"} onChange={this.toggle} />
              <Label basic color="blue">
                Will Host a Class
              </Label>
              <Checkbox name={"host_a_class"} onChange={this.toggle} />
            </Segment>
          </Form.Group>

          <Form.TextArea
            label="How do you know them?"
            placeholder="I met them at Whole Foods Market...."
            name={"know_them"}
            onChange={this.handleChange}
          />
          <Form.TextArea
            label="Health Needs"
            placeholder="Very anxious and sneezy..."
            name={"health_needs"}
            onChange={this.handleChange}
          />
          <Form.TextArea
            label="Family"
            placeholder="They have 11 kids, two dogs and 4 cats..."
            name={"family"}
            onChange={this.handleChange}
          />
          <Form.TextArea
            label="Occupation"
            placeholder="Retired..."
            name="phone"
            onChange={this.handleChange}
          />
          <Form.TextArea
            label="Recreation"
            placeholder="Their hobbies include swimming and sky diving on a normal basis..."
            name={"recreation"}
            onChange={this.handleChange}
          />
          <Form.TextArea
            label="Additional Notes"
            placeholder="Totally forgot to add a note about this..."
            name={"additional_notes"}
            onChange={this.handleChange}
          />
          <Form.Group>
            <div style={{ margin: "auto auto" }}>
              <Button.Group>
                <Button href="/dashboard/prospects">Cancel</Button>
                <Button.Or />
                <Button color="blue" positive>
                  Save
                </Button>
              </Button.Group>
            </div>
          </Form.Group>
        </Form>
        {this.state.goBack ? <Redirect push to="/dashboard/prospects"/> : null }
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(ProspectsNew);
