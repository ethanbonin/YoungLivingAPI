import React, { Component } from "react";
import * as actions from "../../../actions";
import { connect } from "react-redux";

class EmailCommunicator extends Component {
  render(){
    return(
      <div>Email Communicator</div>
    )
  }
}




function mapStateToProps({ auth, twilio }) {
  return { auth, twilio };
}

export default connect(mapStateToProps, actions)(EmailCommunicator);
