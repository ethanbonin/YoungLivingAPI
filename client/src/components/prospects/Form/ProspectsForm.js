import React, { Component } from "react";
import LabelsDropDown from "./LabelsDropDown";

//Personal Form Components
import PersonalInfo from "./PersonalInfoComponent";
import SaveCancelButtons from "./SaveCancelComponent";
import RedirectComponent from "./Redirect";
import RadioButtons from "./RadioButtonsComponent";
import AddressField from "./AddressFieldsComponent";

import { Form, Segment, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import _ from "lodash";
import "react-datepicker/dist/react-datepicker.css";
import {
  box_values,
  details,
  form_state_initializer
} from "../raw_data";
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
        ...form_state_initializer,
        masterList: this.props.labels.prospectslabels[0].labels
      };
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
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

  handleAddressChange = (e, { name, value }) => {
    let address = this.state.address;
    address[name] = value;
    this.setState({ address: address });
  };

  handleRadioChange = e => {
    this.setState({ lead: e.target.id });
  };

  checkEmail() {
    if (this.state.email !== "") {
      const regex_email = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/;
      const result_email = regex_email.test(this.state.email);
      if (!result_email) {
        this.setState({ email_error_format: !result_email });
        return;
      }
    }
  }

  checkPhone() {
    if (this.state.phone !== "") {
      const regex_number = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/;
      const result_number = regex_number.test(this.state.phone);
      if (!result_number) {
        this.setState({ phone_error_format: !result_number });
        return;
      }
    } else {
      this.setState({ phone: "0000000000" });
    }
  }

  handleSubmit = () => {
    this.checkEmail();
    this.checkPhone();

    this.props.updateLabels(
      this.props.labels.prospectslabels[0]._id,
      this.state.masterList
    );
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
    this.setState({ masterList: uniqueMaster });
  }

  renderPersonal() {
    return (
      <Form.Group>
        <PersonalInfo info={this.state} handleChange={this.handleChange} />
      </Form.Group>
    );
  }

  renderDateMet() {
    return (
      <Form.Field>
        <label>Date that you met</label>
        <DatePicker
          selected={this.state.met_date}
          onChange={this.handleDateChange}
        />
      </Form.Field>
    );
  }

  renderLabelsInput() {
    return (
      <Segment>
        <Label>
          Choose Tags for this Prospect. This is to help you better organize
          your prospects.
        </Label>
        <LabelsDropDown
          masterList={this.state.masterList}
          handleLabelAddition={this.handleLabelAddition}
          labelsChosen={this.state.labels}
        />
      </Segment>
    );
  }

  render() {
    return (
      <Segment
        style={{ marginTop: "3em", marginLeft: "6em", marginRight: "6em" }}
      >
        <div>
          <Form onSubmit={this.handleSubmit}>
            {this.renderPersonal()}
            {this.renderDateMet()}
            <Segment>
              <label>LEAD</label>
              <RadioButtons handleRadioChange={this.handleRadioChange} />
            </Segment>
            {this.renderLabelsInput()}
            <Segment>{this.renderCheckBoxes()}</Segment>
            <Segment>
              <AddressField
                data={this.state}
                handleAddressChange={this.handleAddressChange}
              />
            </Segment>
            {this.renderPersonalDetails()}
            <SaveCancelButtons />
          </Form>
          <RedirectComponent data={this.state} truthy={this.state.goBack} />
        </div>
      </Segment>
    );
  }
}

function mapStateToProps({ prospects, labels }) {
  return { prospects, labels };
}

export default connect(mapStateToProps, actions)(ProspectsNew);
