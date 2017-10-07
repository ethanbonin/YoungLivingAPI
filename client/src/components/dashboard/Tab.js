import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import {Link} from "react-router-dom";

class Tab extends Component {
  constructor(props) {
    super();
    this.pickURL = this.pickURL.bind(this);
    const link = this.pickURL(props.name);
    this.state = {link: link};
    console.log("MATCH", props.match)
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
        return "/dashboard/alerts";
      default:
        return "/dashboard";
    }
  }

  render() {
    return (
      <Link to={`${this.props.url}/prospects`}>
      Components
    </Link>
      // <Card
      //   href={this.state.link}
      //   style={{ margin: "1em" }}
      //   raised
      //   color={this.props.color}
      //   image={this.props.image}
      //   header={this.props.name}
      // />
    );
  }
}

export default Tab;
