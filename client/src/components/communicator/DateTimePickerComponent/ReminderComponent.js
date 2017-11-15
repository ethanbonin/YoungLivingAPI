import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import InputDate from "./Input_DatePickerComponent";

const Reminder = (data) => {
  const handleCallBackReminder = (time, reminderMessage) => {
    data.handleReminderSubmission(time, reminderMessage);
  };

  return (
    <Grid.Column>
      <Segment>
        <InputDate
          handleCallBackReminder={(time, message) =>
            handleCallBackReminder(time, message)}
        />
      </Segment>
    </Grid.Column>
  );
};

export default Reminder;
