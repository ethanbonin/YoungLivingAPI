import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Table, Label } from "semantic-ui-react";
import _ from "lodash";
import * as actions from "../../actions";

import ProspectsPerson from "./ProspectsPerson";
import SendEmailModal from "./SendEmailModal";
import { box_values } from "./raw_data";

class Prospects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      prospect: {},
      emailModalOpen: false,
      prospectsList: this.props.prospects
    };

    this.popUpPerson = this.popUpPerson.bind(this);
    this.emailModal = this.emailModal.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.prospectToDelete = this.prospectToDelete.bind(this);
    this.addNote = this.addNote.bind(this);
    this.togglePerson = this.togglePerson.bind(this);
    this.toggleProspectFromMaster = this.toggleProspectFromMaster.bind(this);
  }

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      const prospect = this.props.location.state;
      let p_list = this.state.prospectsList;
      p_list.prospects.push(prospect);
      this.setState({ p_list });
    }
  }

  formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formatted_date = month + "/" + day + "/" + year;
    if (formatted_date === "NaN/NaN/NaN") {
      return "-/-/-";
    }
    return formatted_date;
  }

  formatNumber(s) {
    if (s === "") {
      return "-";
    }

    const regex_number = /(^(\+|00)?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{0,2})$)/;
    const result_number = regex_number.test(s);
    if (result_number) {
      return s;
    }

    var s2 = ("" + s).replace(/\D/g, "");
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return !m ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  }

  formatEmail(e) {
    if (e === "") {
      return "-";
    }
    return e;
  }

  emailModal() {
    this.setState({ emailModalOpen: !this.state.emailModalOpen });
  }

  addNote(_id, note) {
    let list = this.state.prospectsList;
    _.map(list.prospects, function(prospect) {
      if (prospect._id === _id) {
        prospect.additional_notes.push(note);
        return;
      }
      return;
    });
    this.setState({ prospectsList: list });
  }

  togglePerson(_id, toggler, truthy) {
    let list = this.state.prospectsList;
    _.map(list.prospects, function(prospect) {
      if (prospect._id === _id) {
        prospect[toggler] = truthy;
        return;
      }
    });
    this.setState({ prospectsList: list });
  }

  toggleProspectFromMaster(e) {
    console.log(e.target);
    const valuesArr = e.target.id.split(" ");
    const value = valuesArr[0];
    const id = valuesArr[1];

    let list = this.state.prospectsList;
    let truthy = false;
    _.map(list.prospects, function(prospect) {
      if (prospect._id === id) {
        prospect[value] = !prospect[value];
        truthy = prospect[value];
        return;
      }
    });

    this.setState({ prospectsList: list });

    this.props.toggleProspects({
      _id: id,
      value_to_toggle: value,
      truthy: truthy
    });
  }

  popUpPerson = person => {
    this.setState({ modalOpen: !this.state.modalOpen });
    this.setState({ prospect: person });
  };

  prospectToDelete(person) {
    let list = this.state.prospectsList;
    _.remove(list.prospects, function(prospect) {
      return prospect._id === person;
    });
    this.setState({ prospectsList: list });
  }

  renderHeaders() {
    const headerTitles = [
      "#",
      "View",
      "Lead Status",
      "Name",
      "Email",
      "Phone Number",
      "Invited to Class",
      "Text Marketing",
      "Added to FB group",
      "Host a Class",
      "Emailed",
      "Date Met",
      "Date Closed"
    ];

    return _.map(headerTitles, header => {
      return <Table.HeaderCell key={header}>{header}</Table.HeaderCell>;
    });
  }

  renderCheckBoxes(prospect) {
    return _.map(box_values, ({ value, message }) => {
      return (
        <Table.Cell key={value}>
          <p key={value}>
            <input
              type="checkbox"
              id={value + " " + prospect._id}
              name={prospect._id}
              checked={prospect[value]}
              onChange={e => this.toggleProspectFromMaster(e, value)}
            />
            <label htmlFor={value + " " + prospect._id} />
          </p>
        </Table.Cell>
      );
    });
  }

  sortByDate(prospects) {
    let prospects_array = _.sortBy(prospects, function(person) {
      if (person.prospect_created == null) {
        return new Date(person.additional_notes[person.additional_notes.length-1].date);
      }
      return new Date(person.prospect_created);
    });

    let inverse_array = prospects_array.reverse();

    return { prospects: inverse_array };
  }

  renderList() {
    const lead_colors = {
      cold: "black",
      warm: "orange",
      hot: "red"
    };

    switch (this.state.prospectsList) {
      case null:
        return;
      default:
        let prospects = this.state.prospectsList;
        prospects = this.sortByDate(prospects.prospects);
        const truth = _.isEmpty(prospects);
        if (prospects === null || truth) {
          return;
        }
        let i = 0;
        return _.map(prospects.prospects, prospect => {
          i = i + 1;
          const date_met = new Date(prospect.met_date);
          const formatted_date_met = this.formatDate(date_met);
          const date_closed = new Date(prospect.dateClosed);
          const formatted_date_closed = this.formatDate(date_closed);
          return (
            <Table.Row key={prospect._id}>
              <Table.Cell>{i}</Table.Cell>
              <Table.Cell>
                <Button color="teal" onClick={() => this.popUpPerson(prospect)}>
                  View
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Label
                  color={lead_colors[prospect.lead]}
                  horizontal
                  style={{ marginLeft: "10px", width: 60 }}
                >
                  {prospect.lead}
                </Label>
              </Table.Cell>
              <Table.Cell>
                {prospect.first} {prospect.last}
              </Table.Cell>
              <Table.Cell>{this.formatEmail(prospect.email)}</Table.Cell>
              <Table.Cell>{this.formatNumber(prospect.phone)}</Table.Cell>
              {this.renderCheckBoxes(prospect)}
              <Table.Cell>{formatted_date_met}</Table.Cell>
              <Table.Cell>{formatted_date_closed}</Table.Cell>
            </Table.Row>
          );
        });
    }
  }

  render() {
    return (
      <div>
        <Link
          to="/dashboard/prospects/new"
          className="btn-floating btn-large red"
        >
          <i className="material-icons">add</i>
        </Link>
        <Button color="blue" onClick={() => this.emailModal()}>
          Send Greeting Emails
        </Button>
        {this.state.modalOpen ? (
          <ProspectsPerson
            popUp={this.popUpPerson}
            prospect={this.state.prospect}
            prospectToDelete={this.prospectToDelete}
            addNote={this.addNote}
            togglePerson={this.togglePerson}
          />
        ) : null}
        {this.state.emailModalOpen ? (
          <SendEmailModal emailModal={this.emailModal} />
        ) : null}
        <Table celled size="large">
          <Table.Header>
            <Table.Row>{this.renderHeaders()}</Table.Row>
          </Table.Header>
          <Table.Body>{this.renderList()}</Table.Body>
        </Table>
      </div>
    );
  }
}

function mapStateToProps({ prospects }) {
  return { prospects };
}

export default connect(mapStateToProps, actions)(Prospects);
