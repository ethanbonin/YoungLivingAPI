import React, { Component } from "react";
import { Card, Segment, Modal, Icon, Header, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./dashboardcss/dashboard.css";
import Tab from "./Tab";
import _ from "lodash";
import axios from "axios";
import { devNotes, convert_to_normal } from "./devNotes.js";

// https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?h=350&auto=compress&cs=tinysrgb
const imageSrc = {
  stats:
    "https://images.unsplash.com/photo-1457904375453-3e1fc2fc76f4?dpr=1&auto=compress,format&fit=crop&w=1650&h=&q=80&cs=tinysrgb&crop=",
  pros:
    "https://images.unsplash.com/photo-1441205337478-70cb1521e35a?dpr=1&auto=compress,format&fit=crop&w=3900&h=&q=80&cs=tinysrgb&crop=",
  down:
    "https://images.unsplash.com/photo-1469234441726-091a01eb77d1?dpr=1&auto=compress,format&fit=crop&w=2562&h=&q=80&cs=tinysrgb&crop=",
  alerts:
    "https://images.unsplash.com/photo-1506377711776-dbdc2f3c20d9?dpr=1&auto=compress,format&fit=crop&w=2550&h=&q=80&cs=tinysrgb&crop="
};

const _TABS = [
  // { name: "Stats", color: "blue", image: imageSrc.stats },
  { name: "Prospects", color: "pink", image: imageSrc.pros }
  // { name: "Downline", color: "green", image: imageSrc.down },
  // { name: "Alerts", color: "grey", image: imageSrc.alerts }
];

class DashBoard extends Component {
  constructor(props) {
    super();
    this.state = {
      agreed_to_terms: props.auth.user.user.agreed_to_terms,
      disagree_message_appear: false
    };
    this.handleDisagreement = this.handleDisagreement.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleAgreement = this.handleAgreement.bind(this);
  }

  componentWillMount() {
    this.props.fetchProspects();
    this.props.fetchUser();
  }

  renderTabs() {
    return _.map(_TABS, ({ name, color, image }) => {
      return (
        <Tab
          key={name}
          name={name}
          color={color}
          image={image}
          url={this.props.match.url}
        />
      );
    });
  }

  createDateHeader(date) {
    // //This returns the blob of information of the date, and the key is hte date itself.
    return _.map(date, (dev, key) => {
      return (
        <div key={key}>
          <h1 className="title">{key}</h1>
          <div className="ui three cards">{this.createCardHeader(dev)}</div>
        </div>
      );
    });
  }

  createCardHeader(dev) {
    var i = 0;
    return _.map(dev, (value, key) => {
      i = i + 1;
      return (
        <Card color="grey" key={i}>
          <Card.Content className="title" header={convert_to_normal[key]} />
          {this.createCardMessages(value)}
        </Card>
      );
    });
  }

  createCardMessages(value) {
    return _.map(value, message => {
      return <Card.Content key={message} description={message} />;
    });
  }

  renderDevNotes() {
    //This returns the Date that is being used
    return _.map(devNotes, date => {
      return <Segment key={date}>{this.createDateHeader(date)}</Segment>;
    });
  }

  handleAgreement() {
    this.setState({ agreed_to_terms: true });
    axios
      .get("/v0/yl/update_terms")
      .then(body => {
        this.props.fetchUser();
      })
      .catch(err => {
        console.log("There was an error logging out", err);
      });
  }

  handleDisagreement() {
    this.setState({ disagree_message_appear: true });
  }

  handleSignOut() {
    axios
      .get("/v0/yl/logout")
      .then(body => {
        this.props.fetchUser();
      })
      .catch(err => {
        console.log("There was an error logging out", err);
      });
  }

  renderDisagreementMessage() {
    return (
      <Modal
        dimmer={false}
        style={{ height: "188px" }}
        size="small"
        open={this.state.disagree_message_appear}
      >
        <Modal.Header>Disagreement Message</Modal.Header>
        <Modal.Content>
          <p>
            Because you disagreed, you can not use our service. If you're
            interested in using our service, re-sign back in.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button content="Okay" onClick={this.handleSignOut} />
        </Modal.Actions>
      </Modal>
    );
  }

  render() {
    return (
      <div>
        <Modal open={!this.state.agreed_to_terms} basic size="small">
          <Header icon="archive" content="Agree to Terms of Service" />
          <Modal.Content>
            <p>
              In order to use this application, you must agree to the terms of
              service. If you interested in reading the full EULA Agreement,
              click here
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              color="red"
              inverted
              onClick={this.handleDisagreement}
            >
              <Icon name="remove" />
              I Disagree
            </Button>
            <Button positive inverted onClick={this.handleAgreement}>
              <Icon name="checkmark" />
              I Agree
            </Button>
            {this.state.disagree_message_appear
              ? this.renderDisagreementMessage()
              : null}
          </Modal.Actions>
        </Modal>
        <div className="container">
          <Card.Group itemsPerRow={2}>{this.renderTabs()}</Card.Group>
          <Segment basic color="teal">
            <h1 className="title">Developer Notes</h1>
            <div className="updateContainer">{this.renderDevNotes()}</div>
          </Segment>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(DashBoard);
