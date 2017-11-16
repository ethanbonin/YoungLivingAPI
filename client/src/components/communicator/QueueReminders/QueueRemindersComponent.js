import React from "react";
import { List, Segment, Button, Header, Divider } from "semantic-ui-react";
import _ from "lodash";
import moment from "moment";

const QueueReminders = data => {
  const handleDeleteClick = reminder => {
    data.handleDeleteQueueReminder(reminder);
  };

  const renderListItem = () => {
    return _.map(data.data, reminder => {
      if (!reminder.completed) {
        return (
          <List.Item key={reminder._id}>
            <List.Icon name="exclamation" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header className="list_item_header">
                {moment(reminder.time).format("llll")}
              </List.Header>
              <List.Description>{reminder.reminderMessage}</List.Description>
            </List.Content>
            <div className="center_buttons">
              <Button>Edit</Button>
              <Button color="red" onClick={() => handleDeleteClick(reminder)}>
                Delete
              </Button>
            </div>
          </List.Item>
        );
      }
      return null;
    });
  };

  return (
    <Segment className="queue_reminders">
      <Header size="large" className="queued_reminders_header">
        Queued Reminders
      </Header>
      <Divider />
      <List divided relaxed>
        {renderListItem()}
      </List>
    </Segment>
  );
};

export default QueueReminders;
