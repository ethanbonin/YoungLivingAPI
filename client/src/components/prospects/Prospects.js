import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Table, Label, Segment } from "semantic-ui-react";
import _ from "lodash";
import * as actions from "../../actions";

import ProspectModal from "./Modal/ProspectModal";
import { box_values } from "./raw_data";
import SendEmailModal from "./Tools/SendEmailModal";
import Searchbar from "./Tools/Searchbar";
import SortDropDown from "./Tools/SortDropDown";
import FilterLabels from "./Tools/FilterLabels";

import "./prospectscss/prospects.css";

class Prospects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      modalOpen: false,
      results: [],
      closedResults: [],
      value: "",
      prospect: {},
      emailModalOpen: false,
      prospectsList: this.props.prospects,
      sort_by: "newest",
      filter: [],
      filter_list_empty: true,
      closed: false,
      masterList: [],
      closedProspectList: this.findClosedList(this.props.prospects)
    };

    this.popUpPerson = this.popUpPerson.bind(this);
    this.emailModal = this.emailModal.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.prospectToDelete = this.prospectToDelete.bind(this);
    this.addNote = this.addNote.bind(this);
    this.togglePerson = this.togglePerson.bind(this);
    this.toggleProspectFromMaster = this.toggleProspectFromMaster.bind(this);
    this.findClosedList = this.findClosedList.bind(this);

    this.handleSearchResults = this.handleSearchResults.bind(this);
    this.handleSortSelect = this.handleSortSelect.bind(this);
    this.handleFilterSelect = this.handleFilterSelect.bind(this);
    this.filterBy = this.filterBy.bind(this);
  }

  componentWillMount() {
    this.props.fetchLabels();
    if (this.props.location.state !== undefined) {
      const prospect = this.props.location.state;
      let p_list = this.state.prospectsList;
      this.setState({
        masterList: this.props.location.state.masterList
      });
      if (this.props.location.state.editingProspect) {
        var index = _.findIndex(p_list.prospects, { _id: prospect._id });
        p_list.prospects.splice(index, 1, prospect);
      } else {
        prospect.additional_notes = [prospect.additional_notes];
        p_list.prospects.push(prospect);
      }
    } else {
      this.setState({
        masterList: this.props.labels.prospectslabels[0].labels
      });
    }
  }

  findClosedList(prospects) {
    let unpruned_list = prospects;
    let pruned_list = [];

    if (unpruned_list !== undefined){
      unpruned_list.prospects.forEach(prospect => {
        if (prospect.closedDeal !== "") {
          pruned_list.push(prospect);
        }
      });
    }

    return { prospects: pruned_list };
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
    this.props.fetchProspects();
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
    this.props.fetchProspects();
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
    this.props.fetchProspects();
  }

  popUpPerson = person => {
    this.setState({ modalOpen: !this.state.modalOpen });
    this.setState({ prospect: person });
  };

  prospectToDelete(person) {
    let list = this.state.prospectsList;
    let closedList = this.state.closedProspectList;
    _.remove(list.prospects, function(prospect) {
      return prospect._id === person;
    });

    _.remove(closedList.prospects, function(prospect) {
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
      "Date Closed",
      "Close Deal"
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
            return;
          }
          return new Date(person.prospect_created);
        case "first":
          return person.first;
        case "last":
          return person.last;
        case "email":
          return person.email.toLowerCase();
        case "met_old":
        case "met_recent":
          if (person.met_date == null) {
            // return new Date(person.additional_notes[person.additional_notes.length-1].date);
            return;
          }
          return new Date(person.met_date);
        case "closed_old":
        case "closed_recent":
          return person.closedDeal;
        case "email_unchecked":
        case "emailed_checked":
          return person.emailed;
        default:
          console.log("uh?");
      }
    });

    let inverse_array = [];
    if (
      k === "newest" ||
      k === "met_recent" ||
      k === "closed_recent" ||
      k === "emailed_checked"
    ) {
      inverse_array = prospects_array.reverse();
    } else {
      inverse_array = prospects_array;
    }

    return { prospects: inverse_array };
  }

  filterBy(prospects) {
    const list_of_labels = this.state.filter;
    let filtered_prospects = prospects.prospects;
    list_of_labels.forEach(label => {
      filtered_prospects = _.filter(filtered_prospects, function(person) {
        const picked_label = (({ key }) => ({ key }))(label);
        let person_labels = person.labels.map(label => label.key);
        if (_.includes(person_labels, picked_label.key)) {
          return person;
        }
      });
    });

    return { prospects: filtered_prospects };
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

  handleCloseDeal(prospect) {
    this.props.closeProspects(prospect);
    let list = this.state.prospectsList;
    _.find(list.prospects, person => {
      if (person._id === prospect._id) {
        prospect.closedDeal = new Date();
        let closed_list = this.state.closedProspectList;
        closed_list.prospects.unshift(prospect);
      }
    });

    this.props.fetchProspects();
  }

  renderCloseDealButton(prospect) {
    if (prospect.closedDeal === "") {
      return (
        <Table.Cell>
          <Button color="green" onClick={() => this.handleCloseDeal(prospect)}>
            Close Prospect
          </Button>
        </Table.Cell>
      );
    } else {
      return (
        <Table.Cell>
          <Label color="grey">CLOSED</Label>
        </Table.Cell>
      );
    }
  }

  renderList(closedList) {
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

        if (closedList) {
          if (this.state.closedResults.length > 0) {
            prospects = { prospects: this.state.closedResults };
          } else {
            prospects = this.state.closedProspectList;
          }
        }

        if (!_.isEmpty(this.state.filter)) {
          prospects = this.filterBy(prospects);
        }

        prospects = this.sortBy(prospects.prospects);
        const truth = _.isEmpty(prospects);
        if (prospects === null || truth) {
          return;
        }
        let i = 0;
        return _.map(prospects.prospects, prospect => {
          i = i + 1;

          let date_met = new Date(prospect.met_date);
          let formatted_date_met = this.formatDate(date_met);

          const date_closed = new Date(prospect.closedDeal);
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
              {this.renderCloseDealButton(prospect)}
            </Table.Row>
          );
        });
    }
  }

  renderModalToggle() {
    return this.state.modalOpen ? (
      <ProspectModal
        popUp={this.popUpPerson}
        prospect={this.state.prospect}
        prospectToDelete={this.prospectToDelete}
        addNote={this.addNote}
        togglePerson={this.togglePerson}
      />
    ) : null;
  }

  handleSearchResults(results, closedSearch) {
    if (closedSearch) {
      this.setState({ closedResults: results });
      return;
    }

    this.setState({ results: results });
  }

  handleSortSelect(value) {
    this.setState({ sort_by: value });
  }

  handleFilterSelect(value) {
    this.setState({
      filter: [...this.state.filter, value]
    });
  }

  renderTools() {
    return (
      <div className="">
        <Searchbar
          prospects={this.props.prospects}
          handleSearchResults={this.handleSearchResults}
          closedSearch={false}
        />
        <div className="add_send_sort_buttons">
          {!_.isEmpty(this.state.filter) ? (
            <Button
              className="reset_button"
              color="red"
              style={{ marginTop: "1.6em" }}
              onClick={() => this.setState({ filter: [], sort_by: "newest" })}
            >
              Reset
            </Button>
          ) : null}

          <FilterLabels
            masterList={this.state.masterList}
            handleFilterSelect={this.handleFilterSelect}
          />
          <SortDropDown handleSortSelect={this.handleSortSelect} />
          <div className="add_send_buttons">
            <Button as={Link} to={"/dashboard/prospects/new"} color="red">
              Add Prospect
            </Button>
            <Button
              color="blue"
              className="send_email_button"
              onClick={() => this.emailModal()}
            >
              Send Greeting Emails
            </Button>
          </div>
        </div>
      </div>
    );
  }

  renderClosedListTools() {
    const closed_list = this.state.closedProspectList;
    return (
      <div>
        <Searchbar
          prospects={closed_list}
          closedSearch={true}
          handleSearchResults={this.handleSearchResults}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <Segment>
          {this.renderTools()}
          {this.renderModalToggle()}
          {this.state.emailModalOpen ? (
            <SendEmailModal emailModal={this.emailModal} />
          ) : null}
          <Table celled size="large">
            <Table.Header>
              <Table.Row>{this.renderHeaders()}</Table.Row>
            </Table.Header>
            <Table.Body>{this.renderList(false)}</Table.Body>
          </Table>
        </Segment>
        <Segment style={{ marginTop: "5em" }}>
          {this.renderClosedListTools()}
          <div className="close_deal_div">
            <Label color="green" className="closed_deal_label" size="massive">
              CLOSED PROSPECTS
            </Label>
          </div>
          <Table celled size="large">
            <Table.Header>
              <Table.Row>{this.renderHeaders()}</Table.Row>
            </Table.Header>
            <Table.Body>{this.renderList(true)}</Table.Body>
          </Table>
        </Segment>
      </div>
    );
  }
}

function mapStateToProps({ prospects, labels }) {
  return { prospects, labels };
}

export default connect(mapStateToProps, actions)(Prospects);
