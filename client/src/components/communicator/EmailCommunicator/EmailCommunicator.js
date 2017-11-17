import React, { Component } from "react";
import * as actions from "../../../actions";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

class EmailCommunicator extends Component {
  render() {
    return (
      <div>
        <Button as={Link} to={"/dashboard/communicator"} color="blue">
          Go back
        </Button>
        Email Communicator
      </div>
    );
  }
}

function mapStateToProps({ auth, twilio }) {
  return { auth, twilio };
}

export default connect(mapStateToProps, actions)(EmailCommunicator);
