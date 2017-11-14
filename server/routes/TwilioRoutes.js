"use strict";
const express = require("express");
const momentTimeZone = require("moment-timezone");
const moment = require("moment");
const {TwilioReminders} = require("../db/models/TwilioReminders");


const TwilioRoutes = (app) => {
  const getTimeZones = function() {
    return momentTimeZone.tz.names();
  };


  app.get('/v0/yl/reminder', (req, res) => {
    TwilioReminders.find({"memberid": req.session.user.user.memberid}).then((doc) => {res.send(doc)});
  })

  // POST: /appointments
  app.post("/v0/yl/reminder/create", function(req, res) {

    //Preset Data
    const memberid = req.session.user.user.memberid;
    const name = req.session.user.user.member_name;
    const notification = 0;
    const completed = false

    //The message and stuff;
    const reminderMessage = req.body.reminderMessage;
    const time = moment(req.body.time);

                //THESE NEED TO CHANGE TO THESE VARAIBELS
    ////////////////////////////////////////////////////////////

    const timeZone = 'America/Denver'
    // const phoneNumber = req.session.user.user.phoneNumber;
    const phoneNumber = '18326473419';

    //////////////////////////////////////////////////////////////////
    const reminder = new TwilioReminders({
      memberid: memberid,
      name: name,
      phoneNumber: phoneNumber,
      reminderMessage: reminderMessage,
      notification: notification,
      completed: completed,
      timeZone: timeZone,
      time: time
    });

    reminder.save().then((doc) => {res.send(doc)});
  });


  app.delete('/v0/yl/reminder/delete', (req, res) => {
    TwilioReminders.findOneAndRemove({ _id: req.body._id })
      .then(doc => {
        if (!doc) {
          return res.status(404).send();
        }
        res.send({ doc });
      })
      .catch(e => {
        res.status(400).send();
      });
  })

  app.patch('/v0/yl/reminder/update', (req, res) => {
    const updated_reminder = {
      memberid: req.session.user.user.memberid,
      name : req.session.user.user.member_name,
      notification: 0,
      completed: false,
      timeZone: 'America/Denver',
      time: moment(req.body.time),
      reminderMessage: req.body.reminderMessage
    }

    TwilioReminders.findOneAndUpdate({ _id: req.body._id }, updated_reminder, {upsert: true})
      .then(doc => {
        if (!doc) {
          return res.status(404).send();
        }
        res.send({ doc });
      })
      .catch(e => {
        res.status(400).send();
      });
  })


};

module.exports = TwilioRoutes;
