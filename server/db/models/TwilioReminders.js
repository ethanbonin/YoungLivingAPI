var mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require('moment');
const Twilio = require('twilio');

var remindersSchema = new mongoose.Schema({
  memberid: String,
  name: String,
  phoneNumber: String,
  notification: Number,
  reminderMessage: String,
  timeZone: String,
  completed: Boolean,
  time: { type: Date, index: true }
});


remindersSchema.methods.requiresNotification = function(date) {
  return Math.round(moment.duration(moment(this.time).tz(this.timeZone).utc()
                          .diff(moment(date).utc())
                        ).asMinutes()) === this.notification;
};


remindersSchema.statics.sendNotifications = function(callback) {
  // now
  const searchDate = new Date();
  TwilioReminders
    .find()
    .then(function(reminders) {
      reminders = reminders.filter(function(reminder) {
              return reminder.requiresNotification(searchDate);
      });

      // console.log("reminders after words", reminders);
      if (reminders.length > 0) {
        sendNotifications(reminders);
      }
    });


    /**
    * Send messages to all appoinment owners via Twilio
    * @param {array} appointments List of appointments.
    */
    function sendNotifications(reminders) {
        const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        reminders.forEach(function(reminder) {
            // Create options to send the message
            const options = {
                to: `${reminder.phoneNumber}`,
                from: process.env.TWILIO_PHONE_NUMBER,
                /* eslint-disable max-len */
                body: `Hi ${reminder.name}, ${reminder.reminderMessage}`,
                /* eslint-enable max-len */
            };

            // Send the message!
            client.messages.create(options, function(err, response) {
                if (err) {
                    // Just log it for now
                    console.error(err);
                } else {
                    // Log the last few digits of a phone number
                    let masked = reminder.phoneNumber.substr(0,
                        reminder.phoneNumber.length - 5);
                    masked += '*****';
                    console.log(`Message sent to ${masked}`);
                    reminder.completed = true;
                    reminder.save()
                }
            });
        });

        // Don't wait on success/failure, just indicate all messages have been
        // queued for delivery
        if (callback) {
          callback.call();
        }
    }
};


var TwilioReminders = mongoose.model("TwilioReminders", remindersSchema);


module.exports = {
  TwilioReminders: TwilioReminders
};
