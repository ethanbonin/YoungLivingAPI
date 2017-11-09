require("../config/config");
var fs = require("fs");

//THIRD PARTY MODULES
const express = require("express");
var csvjson = require("csvjson");
var request = require("request");
var rp = require("request-promise");
const bodyParser = require("body-parser");
var { mongoose } = require("../db/mongoose");
var session = require("express-session");

var { uidrequest } = require("../middleware/uidrequest");
var { retailcustomers } = require("../middleware/retailcustomers");
var {
  report_data_header,
  about_to_go_inactive_header,
  new_members_header
} = require("../header_data/header_data");

const { User } = require("../db/models/Users");

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
            //This is for the early adotpers of EOA.
            //Since they did not have to agree to terms in the beginning
            //I needed to go through and make sure everybody got updated.
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
                  console.log(result);
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

            sess = req.session;
            var info = { user: b, body: body };
            sess.user = info;

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
};
