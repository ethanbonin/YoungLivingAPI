import React, { Component } from "react";
import { Popup, Icon } from "semantic-ui-react";

class Tooltip extends Component {
  constructor(props) {
    super();
    switch (props.name) {
      case "users":
        this.state = { message: "The total amount of sign ups you have" };
        break;
      case "plus":
        this.state = { message: "Current Months Sign Ups" };
        break;
      case "checkmark":
        this.state = {
          message: "How Many of your sign ups are on Essential Rewards"
        };
        break;
      case "warning":
        this.state = {
          message: "About to go inactive"
        };
        break;
      default:
        this.state = {
          message: "Need to write"
        };
        console.log("theo there");
    }
  }
  render() {
    return (
      <Popup
        trigger={<Icon name={this.props.name} />}
        content={this.state.message}
        basic
      />
    );
  }
}

export default Tooltip;
