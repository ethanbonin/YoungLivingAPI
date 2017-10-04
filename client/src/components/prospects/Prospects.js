import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Checkbox, Table } from "semantic-ui-react";
import _ from "lodash";

import ProspectsPerson from "./ProspectsPerson";

class Prospects extends Component {
  constructor() {
    super();
    this.state = { modalOpen: false, prospect: {} };
    this.popUpPerson = this.popUpPerson.bind(this);
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

  popUpPerson = (person) => {
    this.setState({ modalOpen: !this.state.modalOpen });
    this.setState({ prospect: person });
  }

  renderHeaders() {
    const headerTitles = [
      "View",
      "Name",
      "Email",
      "Phone Number",
      "Follow Up",
      "First Call",
      "Invited to Class",
      "Mail Sample",
      "Text Marketing",
      "Added to FB group",
      "Host a Class",
      "Date Met",
      "Date Closed"
    ];

    return _.map(headerTitles, header => {
      return <Table.HeaderCell>{header}</Table.HeaderCell>;
    });
  }

  renderList() {
    switch (this.props.prospects) {
      case null:
        return;
      default:
        const prospects = this.props.prospects;
        return _.map(prospects.prospects, prospect => {
          const date_met = new Date(prospect.met_date);
          const formatted_date_met = this.formatDate(date_met);
          const date_closed = new Date(prospect.dateClosed);
          const formatted_date_closed = this.formatDate(date_closed);
          return (
            <Table.Row>
              <Table.Cell>
                <Button color="green" onClick={() => this.popUpPerson(prospect)}>
                  View
                </Button>
              </Table.Cell>
              <Table.Cell>
                {prospect.first} {prospect.last}
              </Table.Cell>
              <Table.Cell>{prospect.email}</Table.Cell>
              <Table.Cell>{prospect.phone}</Table.Cell>
              <Table.Cell>
                <Checkbox checked={prospect.follow_up} />
              </Table.Cell>
              <Table.Cell>
                <Checkbox checked={prospect.first_call} />
              </Table.Cell>
              <Table.Cell>
                <Checkbox checked={prospect.invite_to_class} />
              </Table.Cell>
              <Table.Cell>
                <Checkbox checked={prospect.mail_sample} />
              </Table.Cell>
              <Table.Cell>
                <Checkbox checked={prospect.texting_marketing} />
              </Table.Cell>
              <Table.Cell>
                <Checkbox checked={prospect.add_facebook_group} />
              </Table.Cell>
              <Table.Cell>
                <Checkbox checked={prospect.host_a_class} />
              </Table.Cell>
              <Table.Cell>{formatted_date_met}</Table.Cell>
              <Table.Cell>{formatted_date_closed}</Table.Cell>
            </Table.Row>
          );
        });
    }
  }

  render() {
    return (
      <div style={{}}>
        {this.state.modalOpen ? <ProspectsPerson popUp={this.popUpPerson} prospect={this.state.prospect}/> : null}
        <Table celled size="large">
          <Table.Header>
            <Table.Row>{this.renderHeaders()}</Table.Row>
          </Table.Header>
          <Table.Body>{this.renderList()}</Table.Body>
        </Table>

        <Link
          to="/prospects/new"
          className="btn-floating btn-large red"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ prospects }) {
  return { prospects };
}

export default connect(mapStateToProps)(Prospects);
