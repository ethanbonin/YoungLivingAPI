import React, { Component } from "react";
import LabelsDropDown from "./LabelsDropDown";

import { Form, Segment, Button, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import _ from "lodash";
import "react-datepicker/dist/react-datepicker.css";
import { box_values, info, lead, details } from "./raw_data";
var ObjectID = require("bson-objectid");

class ProspectsNew extends Component {
  constructor(props) {
    super(props);
    if (props.location.state !== undefined) {
      this.state = {
        ...props.location.state,
        met_date: moment(props.location.state.met_date),
        old_notes: props.location.state.additional_notes
      };
    } else {
      const NEW_ID = ObjectID.generate();
      this.state = {
        _id: NEW_ID,
        met_date: moment(),
        first: "",
        last: "",
        email: "",
        phone: "",
        invite_to_class: false,
        add_facebook_group: false,
        texting_marketing: false,
        emailed: false,
        host_a_class: false,
        know_them: "",
        lead: "warm",
        health_needs: "",
        family: "",
        occupation: "",
        recreation: "",
        additional_notes: "",
        closedDeal: "",
        first_error: false,
        last_error: false,
        email_error: false,
        phone_error: false,
        labels: [],
        email_error_format: false,
        phone_error_format: false,
        goBack: false,
        editingProspect: false,
        masterList: this.props.labels.prospectslabels[0].labels
      };
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.renderPersonalInfo = this.renderPersonalInfo.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getNewProspect = this.getNewProspect.bind(this);
    this.handleLabelAddition = this.handleLabelAddition.bind(this);
  }

  componentWillMount() {
    this.setState({ additional_notes: "" });
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

  getNewProspect() {
    const list = this.state;
    return list;
  }

  handleSubmit = () => {
    if (this.state.email !== "") {
      const regex_email = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/;
      const result_email = regex_email.test(this.state.email);
      if (!result_email) {
        this.setState({ email_error_format: !result_email });
        return;
      }
    }

    if (this.state.phone !== "") {
      const regex_number = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/;
      const result_number = regex_number.test(this.state.phone);
      if (!result_number) {
        this.setState({ phone_error_format: !result_number });
        return;
      }
    }

    if (this.state.phone === "") {
      this.setState({ phone: "0000000000" });
    }

    this.props.updateLabels(this.props.labels.prospectslabels[0]._id,this.state.masterList);
    this.props.postProspects(this.state);
    this.props.fetchProspects();
    this.props.fetchLabels();
    this.setState({
      goBack: true
    });
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
            checked={this.state[value]}
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
        <div style={{ margin: "1em" }} key={value}>
          <Form.Input
            label={label}
            placeholder={label}
            name={value}
            onChange={this.handleChange}
            error={this.state[v]}
            value={this.state[value]}
          />
          {this.state[v] ? (
            <Label basic color="red" pointing>
              Please enter a value
            </Label>
          ) : null}
          {this.state[v_format] ? (
            <Label basic color="red" pointing>
              Please enter the correct format
            </Label>
          ) : null}
        </div>
      );
    });
  }

  renderRadioButtons() {
    return _.map(lead, ({ value, label }) => {
      const v = value;
      return (
        <p key={value}>
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
    return _.map(details, ({ key, value, label, placeholder }) => {
      return (
        <Form.TextArea
          label={label}
          placeholder={placeholder}
          name={value}
          onChange={this.handleChange}
          key={key}
          value={this.state[value]}
        />
      );
    });
  }

  handleLabelAddition(label) {
    const formatted_labels = _.map(label, value => {
      return { key: value, text: value, value: value };
    });
    this.setState({ labels: formatted_labels });

    let masterList = this.state.masterList;

    var concatMaster = masterList.concat(formatted_labels);
    var uniqueMaster = _.uniqBy(concatMaster, function(e) {
      return e.key.toLowerCase();
    });

    this.setState({masterList: uniqueMaster});
  }

  render() {
    let notes;
    if (this.state.old_notes !== undefined) {
      notes = this.state.old_notes;
    } else {
      notes = { date: new Date(), message: this.state.additional_notes };
    }
    return (
      <Segment
        style={{ marginTop: "3em", marginLeft: "6em", marginRight: "6em" }}
      >
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">{this.renderPersonalInfo()}</Form.Group>
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
            <Segment>
              <Label>
                Choose Tags for this Prospect. This is to help you better
                organize your prospects.
              </Label>
              <LabelsDropDown
                masterList={this.state.masterList}
                handleLabelAddition={this.handleLabelAddition}
                labelsChosen={this.state.labels}
              />
            </Segment>
            <Segment>{this.renderCheckBoxes()}</Segment>
            {this.renderPersonalDetails()}
            <Form.Group>
              <div style={{ margin: "auto auto" }}>
                <Button.Group>
                  <Button as={Link} to={"/dashboard/prospects"}>
                    Cancel
                  </Button>
                  <Button.Or />
                  <Button color="teal" positive>
                    Save
                  </Button>
                </Button.Group>
              </div>
            </Form.Group>
          </Form>

          {this.state.goBack ? (
            <Redirect
              push
              to={{
                pathname: "/dashboard/prospects",
                state: {
                  _id: this.state._id,
                  first: this.state.first,
                  last: this.state.last,
                  met_date: "UPDATING",
                  email: this.state.email,
                  phone: this.state.phone,
                  invite_to_class: this.state.invite_to_class,
                  add_facebook_group: this.state.add_facebook_group,
                  texting_marketing: this.state.texting_marketing,
                  emailed: this.state.emailed,
                  host_a_class: this.state.host_a_class,
                  know_them: this.state.know_them,
                  lead: this.state.lead,
                  health_needs: this.state.health_needs,
                  family: this.state.family,
                  occupation: this.state.occupation,
                  recreation: this.state.recreation,
                  labels: this.state.labels,
                  additional_notes: notes,
                  closedDeal: "",
                  editingProspect: this.state.editingProspect
                }
              }}
            />
          ) : null}
        </div>
      </Segment>
    );
  }
}

function mapStateToProps({ prospects, labels }) {
  return { prospects, labels };
}

export default connect(mapStateToProps, actions)(ProspectsNew);
