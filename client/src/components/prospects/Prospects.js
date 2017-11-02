import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Table, Label, Search, Dropdown } from "semantic-ui-react";
import _ from "lodash";
import * as actions from "../../actions";

import ProspectsPerson from "./ProspectsPerson";
import SendEmailModal from "./SendEmailModal";
import { box_values, ordering_options } from "./raw_data";
import "./prospectscss/prospects.css";

class Prospects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      modalOpen: false,
      results: [],
      value: "",
      prospect: {},
      emailModalOpen: false,
      prospectsList: this.props.prospects,
      sort_by: "newest"
    };

    this.popUpPerson = this.popUpPerson.bind(this);
    this.emailModal = this.emailModal.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.prospectToDelete = this.prospectToDelete.bind(this);
    this.addNote = this.addNote.bind(this);
    this.togglePerson = this.togglePerson.bind(this);
    this.toggleProspectFromMaster = this.toggleProspectFromMaster.bind(this);
  }

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      console.log("PROPS", this.props.location.state);
      const prospect = this.props.location.state;
      console.log("PROSPECT ASSIGNED", prospect);
      let p_list = this.state.prospectsList;
      console.log("p_list assigned", p_list);
      prospect.additional_notes = [prospect.additional_notes]
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
        console.log("THE NOTE", note);
        console.log("The prospect", prospect.additional_notes);
        prospect.additional_notes.push(note);
        return;
      }
      return;
    });
    this.props.fetchProspects()
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
    this.props.fetchProspects()

  }

  toggleProspectFromMaster(e) {
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
    this.props.fetchProspects()
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
    this.props.fetchProspects();
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

  sortBy(prospects) {
    const k = this.state.sort_by;
    let prospects_array = _.sortBy(prospects, function(person) {

      switch (k) {
        case "newest":
          if (person.prospect_created == null) {
            // return new Date(person.additional_notes[person.additional_notes.length-1].date);
            return
          }
          return new Date(person.prospect_created);
        case "first":
          return person.first;
        case "last":
          return person.last;
        case "email":
          return person.email;
        case "met_old":
        case "met_recent":
          if (person.met_date == null) {
            // return new Date(person.additional_notes[person.additional_notes.length-1].date);
            return
          }
          return new Date(person.met_date);
        default:
          console.log("uh?");
      }

    });

    let inverse_array = [];
    if (k === "newest" || k === "met_recent") {
      inverse_array = prospects_array.reverse();
    } else {
      inverse_array = prospects_array;
    }

    return { prospects: inverse_array };
  }


  renderNumberViewLead(prospect, i) {
    const lead_colors = {
      cold: "black",
      warm: "orange",
      hot: "red"
    };

    let j = i * 200;
    let k = j * 200;
    return [
      <Table.Cell key={i}>{i}</Table.Cell>,
      <Table.Cell key={j}>
        <Button color="teal" onClick={() => this.popUpPerson(prospect)}>
          View
        </Button>
      </Table.Cell>,
      <Table.Cell key={k}>
        <Label
          color={lead_colors[prospect.lead]}
          horizontal
          style={{ marginLeft: "10px", width: 60 }}
        >
          {prospect.lead}
        </Label>
      </Table.Cell>
    ];
  }

  renderList() {
    switch (this.state.prospectsList) {
      case null:
        return;
      default:
        let prospects;
        if (this.state.results.length > 0) {
          prospects = { prospects: this.state.results };
        } else {
          prospects = this.state.prospectsList;
        }

        prospects = this.sortBy(prospects.prospects);
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
              {this.renderNumberViewLead(prospect, i)}
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

  renderModalToggle() {
    return this.state.modalOpen ? (
      <ProspectsPerson
        popUp={this.popUpPerson}
        prospect={this.state.prospect}
        prospectToDelete={this.prospectToDelete}
        addNote={this.addNote}
        togglePerson={this.togglePerson}
      />
    ) : null;
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();
      let array_of_searched_prospects = [];
      for (var i = 0; i < this.state.prospectsList.prospects.length; i++) {
        let prosp = this.state.prospectsList.prospects[i].first;
        if (prosp.toUpperCase().indexOf(value.toUpperCase()) > -1) {
          array_of_searched_prospects.push(
            this.state.prospectsList.prospects[i]
          );
        }
      }
      this.setState({
        isLoading: false,
        results: array_of_searched_prospects
      });
    }, 100);
  };

  renderSearchBar() {
    return (
      <Search
        category
        loading={this.state.isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        value={this.state.value}
        noResultsMessage={"LOADING"}
      />
    );
  }

  handleSortSelect(value) {
    this.setState({ sort_by: value.value });
  }

  renderDropDown() {
    return (
      <Dropdown
        fluid
        text="Sort Prospect"
        icon="filter"
        labeled
        button
        className="icon"
        style={{ marginTop: "5px" }}
        onChange={e => console.log()}
      >
        <Dropdown.Menu>
          <Dropdown.Divider />
          <Dropdown.Menu scrolling>
            {ordering_options.map(option => (
              <Dropdown.Item
                key={option.value}
                {...option}
                onClick={() => this.handleSortSelect(option)}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  render() {
    return (
      <div>
        <div className="tools">
          <Link
            to="/dashboard/prospects/new"
            className="btn-floating btn-large red"
          >
            <i className="material-icons">add</i>
          </Link>
          <Button color="blue" onClick={() => this.emailModal()}>
            Send Greeting Emails
          </Button>
          {this.renderSearchBar()}
          {this.renderDropDown()}
        </div>
        {this.renderModalToggle()}
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
