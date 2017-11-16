import React from "react";
import { List, Segment, Header, Divider } from "semantic-ui-react";
import _ from "lodash";
import moment from "moment";

const CompletedReminders = data => {
  console.log(data);

  const renderListItem = () => {
    return _.map(data.data, reminder => {
      if (reminder.completed) {
        return (
          <List.Item key={reminder._id}>
            <List.Icon
              name="comment outline"
              size="large"
              verticalAlign="middle"
            />
            <List.Content>
              <List.Header className="list_item_header">{moment(reminder.time).format("llll")}</List.Header>
              <List.Description>{reminder.reminderMessage}</List.Description>
            </List.Content>
          </List.Item>
        );
      }
      return null;
    });
  };

  return (
    <Segment className="completed_reminders">
      <Header size="large" className="completed_reminders_header">
        Completed Reminders
      </Header>
      <Divider/>
      <List divided relaxed>
        {renderListItem()}
      </List>
    </Segment>
  );
};

export default CompletedReminders;
