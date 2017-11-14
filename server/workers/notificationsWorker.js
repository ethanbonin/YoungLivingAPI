'use strict';

const {TwilioReminders} = require("../db/models/TwilioReminders");

const notificationWorkerFactory = function() {
  return {
    run: function() {
      TwilioReminders.sendNotifications();
    },
  };
};

module.exports = notificationWorkerFactory();
