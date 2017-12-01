import React, { Component } from "react";
import * as actions from "../../actions";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import _ from "lodash";

//First party components
import UpdatePhoneMessage from "./UpdatePhoneMessageComponent";
import Reminder from "./DateTimePickerComponent/ReminderComponent";
import CompletedReminders from "./CompletedReminders/CompletedRemindersComponent";
import QueueReminders from "./QueueReminders/QueueRemindersComponent";
import TextCard from "./TextCommunicator/TextCommunicatorCard";
import EmailCard from "./EmailCommunicator/EmailCommunicatorCard";

class Communicator extends Component {
  constructor(props) {
    super(props);
    let phoneNumber = true;

    if (
      props.auth.user.user.phoneNumber === undefined ||
      props.auth.user.user.phoneNumber === "" ||
      props.auth.user.user.timeZone === undefined ||
      props.auth.user.user.timeZone === ""
    ) {
      phoneNumber = false;
    }

    let completedRemindersList = [];
    let queuedReminderList = []
    props.twilio.forEach(reminder => {
      if (reminder.completed) {
        completedRemindersList.push(reminder);
      } else {
        queuedReminderList.push(reminder);
      }
    });

    this.state = {
      hasPhoneNumber: phoneNumber,
      remindersList: this.props.twilio,
      completedRemindersList: completedRemindersList.reverse(),
      queuedReminderList: queuedReminderList
    };

    props.headerLocation('Communicator');
    this.handleReminderSubmission = this.handleReminderSubmission.bind(this);
  }

  handleReminderSubmission(_id, time, reminderMessage) {
    let reminder = { _id, time, reminderMessage };
    this.props.createReminder(reminder);
    let rl = this.state.remindersList;
    rl.unshift(reminder);
    this.setState({ queuedReminderList: rl });
    this.props.fetchReminders();
  }

  handleUpdateNumberSubmit = (value, timeZone) => {
    this.props.updatePhoneNumer(value, timeZone);
    this.setState({ hasPhoneNumber: true });
  };

  handleDeleteQueueReminder(reminder) {
    this.props.deleteReminder(reminder);
    _.remove(this.state.queuedReminderList, function(delete_reminder) {
      return delete_reminder._id === reminder._id;
    });
    this.props.fetchReminders();
  }

  handleEditQueueReminder(_id, time, reminderMessage) {
    let reminder = { _id, time, reminderMessage };
    this.props.editReminder(reminder);
    _.find(this.state.remindersList, reminder => {
      if (reminder._id === _id) {
        reminder.reminderMessage = reminderMessage;
        reminder.time = time;
      }
    });
    this.props.fetchReminders();
  }

  renderCommunicator() {
    return (
      <div className="div_communicator">
        <Grid columns={3}>
          <Grid.Row className="grid_spacing">
            <Reminder
              edit={false}
              handleReminderSubmission={this.handleReminderSubmission}
            />
            <Grid.Column>
              <QueueReminders
                data={this.state.queuedReminderList}
                handleDeleteQueueReminder={this.handleDeleteQueueReminder.bind(
                  this
                )}
                handleEditQueueReminder={this.handleEditQueueReminder.bind(
                  this
                )}
              />
              <CompletedReminders data={this.state.completedRemindersList} />
            </Grid.Column>
            <Grid.Column>
              <div className="div_for_cards">
                <TextCard />
              </div>
              <div className="div_for_cards">
                <EmailCard />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.hasPhoneNumber ? (
          this.renderCommunicator()
        ) : (
          <UpdatePhoneMessage
            handleUpdateNumberSubmit={this.handleUpdateNumberSubmit}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps({ auth, twilio }) {
  return { auth, twilio };
}

export default connect(mapStateToProps, actions)(Communicator);
