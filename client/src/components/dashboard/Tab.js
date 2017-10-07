import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import {Link} from "react-router-dom";

class Tab extends Component {
  constructor(props) {
    super();
    this.pickURL = this.pickURL.bind(this);
    const link = this.pickURL(props.name);
    this.state = {link: link};
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
      <div style={{marginTop: "3em"}}>
        <Link to={`/${this.props.name.toLowerCase()}`}>{this.props.name}</Link>
      </div>
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
