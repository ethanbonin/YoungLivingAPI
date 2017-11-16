import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import InputDate from "./Input_DatePickerComponent";

const Reminder = (data) => {
  const handleCallBackReminder = (_id, time, reminderMessage) => {
    if (data.edit){
      data.handleEditReminder(_id, time, reminderMessage);
      return
    }
    console.log("inside Reminder comonent", _id,time, reminderMessage);
    data.handleReminderSubmission(_id,time, reminderMessage);
  };


  return (
    <Grid.Column>
      <Segment>
        <InputDate
          edit={data.edit}
          reminder={data.reminder}
          handleCallBackReminder={(_id, time, message) =>
            handleCallBackReminder(_id, time, message)}
        />
      </Segment>
    </Grid.Column>
  );
};

export default Reminder;
