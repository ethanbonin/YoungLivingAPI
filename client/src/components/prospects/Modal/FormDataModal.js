import React, { Component } from "react";
import { Segment, Label, Grid, Item, Divider, Button } from "semantic-ui-react";
import moment from "moment";
import { connect } from "react-redux";
import _ from "lodash";
import "react-datepicker/dist/react-datepicker.css";
import { box_values } from "../raw_data";
import * as actions from "../../../actions";
import "../prospectscss/prospects.css";


//Custom Data Components
import StaticInfo from './FDMComponents/ModalStaticInfo';
import PersonalInfo from './FDMComponents/ModalPersonalInfo';


class FormDataModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      met_date: moment(),
      new_note: "",
      ...props.data
    };
    this.handleNoteSubmission = this.handleNoteSubmission.bind(this);
  }

  handleNoteSubmission() {
    this.props.patchProspects({
      _id: this.props.data._id,
      message: this.state.new_note
    });

    const new_note = {
      message: this.state.new_note,
      date: new Date()
    };

    this.props.addNote(this.props.data._id, new_note);
    this.setState({ new_note: "" });
  }

  toggleSubmission(e) {
    this.props.toggleProspects({
      _id: this.props.data._id,
      value_to_toggle: e.target.id,
      truthy: !this.state[e.target.id]
    });

    this.props.togglePerson(
      this.props.data._id,
      e.target.id,
      !this.state[e.target.id]
    );

    this.props.fetchProspects();
    this.setState({ [e.target.id]: !this.state[e.target.id] });
  }

  renderCheckBoxes() {
    return _.map(box_values, ({ value, message }) => {
      return (
        <p key={value}>
          <input
            type="checkbox"
            id={value}
            name={value}
            checked={this.state[value]}
            onChange={e => this.toggleSubmission(e)}
          />
          <label htmlFor={value}>{message}</label>
        </p>
      );
    });
  }

  formatDate(date) {
    const date_format = new Date(date);
    const day = date_format.getDate();
    const month = date_format.getMonth() + 1;
    const year = date_format.getYear();
    return month + "/" + day + "/" + year;
  }

  checkedIfEmailed(emailed) {
    if (emailed === undefined) {
      this.setState({ emailed: false });
    }
  }

  renderNotes() {
    var notes_array = this.state.additional_notes;
    notes_array = _.sortBy(notes_array, function(note) {
      if (note.date == null) {
        return;
      }
      return new Date(note.date);
    });

    notes_array = _.reverse(notes_array);

    return _.map(notes_array, ({ message, date }) => {
      return (
        <Segment key={date}>
          <Item.Meta>
            <Label size="huge">{this.formatDate(date)}</Label>
            <Divider />
            {message}
          </Item.Meta>
        </Segment>
      );
    });
  }

  renderAddress() {
    if (this.props.data.address !== undefined) {
      return (
        <Label className="address_modal_label" size="large">
          {this.props.data.address.address1}, {this.props.data.address.address2},{" "}
          {this.props.data.address.city}, {this.props.data.address.state},{" "}
          {this.props.data.address.zip}
        </Label>
      );
    }
  }

  renderLeftGridColumn(){
    return(
      <Grid.Column>
        <Label size="huge" color="teal">
          Personal Info
        </Label>
        <Segment key={1}>
          <PersonalInfo data={this.props.data}/>
          {this.renderAddress()}
        </Segment>
        <Label ribbon={false} size="huge" color="teal">
          Check-List
        </Label>
        <Segment>{this.renderCheckBoxes()}</Segment>
        <Label size="huge" color="teal">
          Personal Details
        </Label>
        <Segment><StaticInfo data={this.props.data}/></Segment>
      </Grid.Column>
    )
  }


  renderRightGridColumn(){
    return(
      <Grid.Column>
        <Segment>
          <Label>New Note</Label>
          <textarea
            value={this.state.new_note}
            style={{ height: 150 }}
            onChange={e => this.setState({ new_note: e.target.value })}
          />
          <Button onClick={this.handleNoteSubmission} color={"teal"}>
            Submit
          </Button>
        </Segment>
        <br />
        <br />
        <Label ribbon={false} size="huge" color="teal">
          Notes
        </Label>
        <Segment>{this.renderNotes()}</Segment>
      </Grid.Column>
    )
  }

  render() {
    return (
      <div style={{ marginTop: "3em", marginLeft: "1em", marginRight: "1em" }}>
        <Grid columns={2} padded="horizontally">
          {this.renderLeftGridColumn()}
          {this.renderRightGridColumn()}
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ auth, labels }) {
  return { auth, labels };
}

export default connect(mapStateToProps, actions)(FormDataModal);
