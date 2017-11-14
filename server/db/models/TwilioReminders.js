var mongoose = require("mongoose");
const { Schema } = mongoose;


var remindersSchema = new mongoose.Schema({
  memberid: String,
  name:String,
  phoneNumber: String,
  notification : Number,
  reminderMessage: String,
  timeZone : String,
  time : {type : Date, index : true}
});


var reminders = mongoose.model("TwilioReminders", remindersSchema);

module.exports = {
  TwilioReminders: reminders
};
