import React, { Component } from "react";
import * as actions from "../../actions";
import { connect } from "react-redux";
import { Grid, Segment } from "semantic-ui-react";

//First party components
import UpdatePhoneMessage from "./UpdatePhoneMessageComponent";
import Reminder from './DateTimePickerComponent/ReminderComponent';


class Communicator extends Component {
  constructor(props) {
    super(props);
    console.log("The props", props);
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

    this.handleReminderSubmission = this.handleReminderSubmission.bind(this);
  }

  handleReminderSubmission(time, reminderMessage){
    this.props.createReminder({time, reminderMessage});
  }

  handleUpdateNumberSubmit = (value, timeZone) => {
    this.props.updatePhoneNumer(value, timeZone);
    this.props.fetchUser();
    this.setState({ hasPhoneNumber: true });
  };

  render() {
    return (
      <div>
        {this.state.hasPhoneNumber ? null : (
          <UpdatePhoneMessage
            handleUpdateNumberSubmit={this.handleUpdateNumberSubmit}
          />
        )}

        <Grid columns={3} divided stretched>
          <Grid.Row>
            <Reminder handleReminderSubmission={this.handleReminderSubmission}/>
            <Grid.Column>
              <Segment>1</Segment>
              <Segment>2</Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>1</Segment>
              <Segment>2</Segment>
              <Segment>3</Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(Communicator);
