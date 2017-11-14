import React, { Component } from "react";
import * as actions from "../../actions";
import { connect } from "react-redux";

//First party components
import UpdatePhoneMessage from "./UpdatePhoneMessageComponent";

class Communicator extends Component {
  constructor(props) {
    super(props);
    let phoneNumber = true;

    if (
      props.auth.user.user.phoneNumber === undefined ||
      props.auth.user.user.phoneNumber === ""
    ) {
      console.log("EMPTY!!");
      phoneNumber = false;
    }

    this.state = {
      hasPhoneNumber: phoneNumber
    };
  }


  handleUpdateNumberSubmit = (value) => {
    console.log(value);
    this.props.updatePhoneNumer(value);
  }


  render() {
    return (
      <div>
        {this.state.hasPhoneNumber ? null : <UpdatePhoneMessage handleUpdateNumberSubmit={this.handleUpdateNumberSubmit} />}
        Communicator
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(Communicator);
