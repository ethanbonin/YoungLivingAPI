import React, { Component } from "react";
import { Segment, Label, Grid, Item, Divider, Button } from "semantic-ui-react";
import moment from "moment";
import { connect } from "react-redux";
import _ from "lodash";
import "react-datepicker/dist/react-datepicker.css";
import { box_values } from "./raw_data";
import * as actions from "../../actions";

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
      emailed: this.props.data.emailed,
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
      closedDeal: this.props.data.closedDeal,
      new_note: ""
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

  toggleSubmission(e){
    this.props.toggleProspects({
      _id: this.props.data._id,
      value_to_toggle: e.target.id,
      truthy: !this.state[e.target.id]
    })

    this.props.fetchProspects();
    this.setState({[e.target.id]: !this.state[e.target.id]})
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
            onChange={(e)=> this.toggleSubmission(e)}
          />
          <label htmlFor={value}>{message}</label>
        </p>
      );
    });
  }

  renderStaticInfo() {
    const headerValue = {
      know_them: "How do you Know Them",
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
              <Label color="grey" size={"medium"}>
                {headerValue[key]}
              </Label>
            </Item.Header>
            <Item.Meta style={{ marginLeft: "15px" }}>{value}</Item.Meta>
          </Item>
        );
      }
    });
  }

  formatDate(date) {
    const date_format = new Date(date);
    const day = date_format.getDate();
    const month = date_format.getMonth() + 1;
    const year = date_format.getYear();
    return month + "/" + day + "/" + year;
  }

  checkedIfEmailed(emailed){
    if (emailed === undefined){
      this.setState({emailed: false});
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

  renderPersonalInfo() {
    const headerValue = {
      phone: {
        header: "Phone",
        icon: "phone"
      },
      email: {
        header: "Email",
        icon: "mail"
      }
    };

    return _.map(this.props.data, (value, key) => {
      var truth = false;
      truth = _.hasIn(headerValue, key);

      if (truth) {
        return (
          <div key={key}>
            <Segment>
              <Label
                color="grey"
                icon={headerValue[key].icon}
                content={headerValue[key].header}
                key={headerValue[key]}
              />
              <span style={{ marginLeft: "4px" }}>{value}</span>
            </Segment>
          </div>
        );
      }
    });
  }



  render() {
    return (
      <div style={{ marginTop: "3em", marginLeft: "1em", marginRight: "1em" }}>
        <Grid columns={2} padded="horizontally">
          <Grid.Column>
            <Label size="huge" color="teal">
              Personal Info
            </Label>
            <Segment key={1}>{this.renderPersonalInfo()}</Segment>
            <Label ribbon={false} size="huge" color="teal">
              Check-List
            </Label>
            <Segment>{this.renderCheckBoxes()}</Segment>
            <Label size="huge" color="teal">
              Personal Details
            </Label>
            <Segment>{this.renderStaticInfo()}</Segment>
          </Grid.Column>
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
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(FormDataModal);
