import React, { Component } from "react";
import { Checkbox, Segment, Label, Grid, Item } from "semantic-ui-react";
import moment from "moment";
import { connect } from "react-redux";
import _ from "lodash";

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
    this.setState({ [name]: value });
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

  renderCheckBoxes() {
    const headerValue = {
      invite_to_class: "Invted to a Class",
      add_facebook_group: "Added To Facebook Group",
      texting_marketing: "Added To Automated Texting",
      host_a_class: "Asked a host a class"
    };
    return _.map(this.props.data, (value, key) => {
      var truth = false;
      truth = _.hasIn(headerValue, key);
      if (truth) {
        return (
          <Item key={headerValue[key]}>
            <Item.Header>
              <Label color="violet" ribbon>
                {headerValue[key]}
              </Label>
            </Item.Header>
            <Item.Meta>
              <Checkbox checked={this.state[key]} />
            </Item.Meta>
          </Item>
        );
      }
    });
  }

  renderStaticInfo() {
    const headerValue = {
      know_them: "Know Them",
      health_needs: "Health Needs",
      family: "Family Details",
      occupation: "Occupation",
      recreation: "Hobbies"
    };

    return _.map(this.props.data, (value, key) => {
      var truth = false;
      truth = _.hasIn(headerValue, key);
      if (truth) {
        return (
          <Item key={headerValue[key]}>
            <Item.Header>
              <Label color="violet" ribbon>
                {headerValue[key]}
              </Label>
            </Item.Header>
            <Item.Meta>{value}</Item.Meta>
          </Item>
        );
      }
    });
  }

  renderPersonalInfo() {
    const headerValue = {
      phone: "Phone",
      first: "First Name",
      last: "Last Name",
      email: "Email"
    };

    console.log(this.props.data);

    return _.map(this.props.data, (value, key) => {
      var truth = false;
      truth = _.hasIn(headerValue, key);
      if (truth) {
        return (
          <Item key={headerValue[key]}>
            <Item.Header>
              <Label color="violet" ribbon>
                {headerValue[key]}
              </Label>
            </Item.Header>
            <Item.Meta>{value}</Item.Meta>
          </Item>
        );
      }
    });
  }

  render() {
    return (
      <div style={{ marginTop: "3em", marginLeft: "1em", marginRight: "1em" }}>
        <Grid columns={2} padded="horizontally">
          <Grid.Column>
              <Label size="huge" color="teal">Personal Info</Label>
              <Segment>
                {this.renderPersonalInfo()}
              </Segment>
            <Label ribbon={false} size="huge" color="teal">
              Check-List
            </Label>
            <Segment>{this.renderCheckBoxes()}</Segment>
            <Label size="huge" color="teal">Personal Details</Label>
            <Segment>
              {this.renderStaticInfo()}
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <h1>Hello World</h1>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(FormDataModal);
