import React, { Component } from "react";
import { Card, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Redirect } from "react-router";
import "./dashboardcss/dashboard.css";
import Tab from "./Tab";
import _ from "lodash";
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
  { name: "Stats", color: "blue", image: imageSrc.stats },
  { name: "Prospects", color: "pink", image: imageSrc.pros },
  { name: "Downline", color: "green", image: imageSrc.down },
  { name: "Alerts", color: "grey", image: imageSrc.alerts }
];

class DashBoard extends Component {
  constructor(props) {
    super();
    this.state = { isLoggedIn: false };
  }

  componentWillMount() {
    if (this.props.auth !== false && this.props.auth !== null) {
      this.setState({ isLoggedIn: true });
      this.props.fetchProspects();
    }
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

  render() {
    return (
      <div>
        <div className="container">
          <Card.Group itemsPerRow={2}>{this.renderTabs()}</Card.Group>
          <Segment basic color="teal">
            <h1 className="title">Developer Notes</h1>
            <div className="updateContainer">{this.renderDevNotes()}</div>
          </Segment>
        </div>
        {this.state.isLoggedIn ? null : <Redirect to="/" />}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(DashBoard);
