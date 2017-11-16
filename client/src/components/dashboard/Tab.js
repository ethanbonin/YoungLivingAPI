import React, { Component } from "react";
import { Card, Dimmer, Loader, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Tab extends Component {
  constructor(props) {
    super();
    this.pickURL = this.pickURL.bind(this);
    const link = this.pickURL(props.name);
    this.state = { link: link};
    console.log("Dimming", props.dim);
  }

  pickURL(name) {
    switch (name.toLowerCase()) {
      case "stats":
        return "/dashboard/stats";
      case "prospects":
        return "/dashboard/prospects";
      case "downline":
        return "/dashboard/downline";
      case "alerts":
        return "/dashboard/communicator";
      default:
        return "/dashboard";
    }
  }

  renderDimmer() {
    return (
      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer>
    );
  }

  render() {
    return (
      <Card as={Link} to={`/dashboard/${this.props.name.toLowerCase()}`}>
        <Image src={this.props.image} />
        <Card.Content>
          {this.props.dim ? this.renderDimmer() : null}
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Description>{this.props.description}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default Tab;
