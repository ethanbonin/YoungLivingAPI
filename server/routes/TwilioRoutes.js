"use strict";
const express = require("express");
const momentTimeZone = require("moment-timezone");
const moment = require("moment");
const {TwilioReminders} = require("../db/models/TwilioReminders");

const TwilioRoutes = (app) => {
  const getTimeZones = function() {
    return momentTimeZone.tz.names();
  };

  // GET: /appointments
  app.get("/reminders", function(req, res) {
    TwilioReminders.find().then(function(appointments) {
      res.send(appointments);
    });
  });

  // POST: /appointments
  app.post("/reminders/create", function(req, res) {
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const notification = req.body.notification;
    const timeZone = req.body.timeZone;
    const time = moment(req.body.time, "MM-DD-YYYY hh:mma");

    const appointment = new Appointment({
      name: name,
      phoneNumber: phoneNumber,
      notification: notification,
      timeZone: timeZone,
      time: time
    });
    appointment.save().then(function() {
      res.redirect("/");
    });
  });

};

module.exports = TwilioRoutes;
