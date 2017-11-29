require("../config/config");
var fs = require("fs");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);



//THIRD PARTY MODULES
const express = require("express");
var csvjson = require("csvjson");
var request = require("request");
var rp = require("request-promise");
const bodyParser = require("body-parser");
var { mongoose } = require("../db/mongoose");
// var session = require("express-session");
var _ = require("lodash");

var { uidrequest } = require("../middleware/uidrequest");
var { retailcustomers } = require("../middleware/retailcustomers");
var {
  report_data_header,
  about_to_go_inactive_header,
  new_members_header
} = require("../header_data/header_data");

const { User } = require("../db/models/Users");
const { ProspectLabels } = require("../db/models/ProspectLabels");

module.exports = app => {



  app.get("/v0/yl/current_user", (req, res) => {
    sess = req.session;
    if (sess.user) {
      res.send(sess);
    } else {
      sess.user = null;
      res.send(sess);
    }
  });

  app.post("/v0/yl/login", (req, res) => {
    var _body = req.body;
    var options = {
      method: "POST",
      url: "https://www.youngliving.com/api/accounts/token",
      body: _body,
      json: true
    };

    rp(options, function(error, response, body) {
      if (error) throw new Error(error + "error-login");
    })
      .then(body => {
        var token = new Buffer(JSON.stringify(body)).toString("base64");
        res.set("authtoken", token);

        User.findByCredentials(body.memberId).then(
          user => {
            sess = req.session;
            var info = { user: user, body: body, token: token };
            sess.user = info;
            // user.lastTimeLoggedIn = new Date();
            const memberId = body.memberId;
            ProspectLabels.find({ memberid: memberId }, (err, doc) => {
              if (err) {
                console.log(
                  "Error in trying to find member id for labels",
                  err
                );
              }

              if (_.isEmpty(doc)) {
                let prospectLabels = {
                  memberid: memberId,
                  labels: [
                    {
                      key: "Master",
                      text: "Master",
                      value: "Master"
                    },
                    {
                      key: "Prospect",
                      text: "Prospect",
                      value: "Prospect"
                    }
                  ]
                };

                var new_labels = new ProspectLabels(prospectLabels);
                new_labels.save().then(() => {
                  console.log("New Labels Saved from existing person");
                });
              }
            });

            if (user.member_name === undefined) {
              let update_user = {
                memberid: user.memberid,
                is_trial: user.is_trial,
                signed_up: user.signed_up,
                is_member: user.is_member,
                agreed_to_terms: false,
                member_name: body.displayName
              };

              User.findOneAndUpdate(
                { _id: user._id },
                update_user,
                { upsert: true },
                (err, result) => {
                  if (err) {
                    console.log(err, "ERROR");
                    res.send({ err: "Error on somethign" });
                  }
                  res.status(200).send(result);
                }
              );
            } else {
              res.send({ user: user, body: body });
            }
          },
          () => {
            var memberid = body.memberId;
            var is_trial = true;
            signed_up = new Date();
            is_member = new Date();
            agreed_to_terms = false;
            member_name = body.displayName;
            let b = {
              memberid: memberid,
              is_trial: is_trial,
              signed_up: signed_up,
              is_member: is_member,
              agreed_to_terms: agreed_to_terms,
              member_name: member_name
            };

            // var admin_emails = ["ethan@ollieandfinch.com", "drbonin@gmail.com"]
            // const msg = {
            //   to: admin_emails,
            //   from: 'essentialAssistant@eoa.com',
            //   subject: 'CONGRATULATIONS: New EOA Sign Up (DNR)',
            //   text: `${member_name} has just signed up!`,
            //   html: `
            //   This is an automated Email. <br> <br> <br>
            //   <strong>${member_name} has just signed up!</strong>
            //   <br> <br> <br>
            //     Do not reply to this email. This is an automated Email.`,
            // };
            // sgMail.send(msg);

            sess = req.session;
            var info = { user: b, body: body };
            sess.user = info;

            let prospectLabels = {
              memberid: memberid,
              labels: [
                {
                  key: "Master",
                  text: "Master",
                  value: "Master"
                },
                {
                  key: "Prospect",
                  text: "Prospect",
                  value: "Prospect"
                }
              ]
            };

            var new_labels = new ProspectLabels(prospectLabels);
            new_labels.save().then(() => {
              console.log("New Labels Saved");
            });

            var user = new User(b);
            user.save().then(() => {
              res.send({ user: user, body: body });
            });
          }
        );
      })
      .catch(e => {
        res.status(401).send({ err: "incorrect username or password" });
      });
  });

  app.get("/v0/yl/logout", (req, res) => {
    req.session.user = null;
    res.redirect("/");
  });

  app.get("/v0/yl/update_terms", (req, res) => {
    req.session.user.user.agreed_to_terms = true;
    const id = req.session.user.user._id;
    User.findOneAndUpdate(
      { _id: id },
      { $set: { agreed_to_terms: true, agreed_to_terms_date: new Date() } }
    )
      .then(prospect => {
        if (!prospect) {
          return res.status(404).send({ err: "not found" });
        }
        res.send({ prospect });
      })
      .catch(e => {
        res.status(400).send();
      });
  });


  app.post('/v0/yl/updatePhoneNumber',(req,res) => {
      User.updatePhoneNumebr(req.session.user.user.memberid, req.body.phoneNumber, req.body.timeZone);
      req.session.user.user.phoneNumber = req.body.phoneNumber;
      req.session.user.user.timeZone = req.body.timeZone;
      console.log("req.session", req.session)
      console.log(req.body.phoneNumber, req.body.timeZone);
      res.send(req.session);
  })

};
