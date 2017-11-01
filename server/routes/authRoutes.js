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
    if (sess.user){
      res.send(sess);
    }else{
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
            var info = {user: user, body: body, token: token};
            sess.user = info;
            res.send({user:user, body:body});
          },
          () => {
            var memberid = body.memberId;
            var is_trial = true;
            signed_up = new Date();
            is_member = new Date();
            let b = {
              memberid: memberid,
              is_trial: is_trial,
              signed_up: signed_up,
              is_member: is_member
            }

            sess = req.session;
            var info = {user: b, body: body};
            sess.user = info

            var user = new User(b);
            user.save().then(() => {
              res.send({ user:user, body: body });
            });
          }
        );
      })
      .catch(e => {
        res.status(401).send({err:"incorrect username or password"});
      });
  });

  app.get('/v0/yl/logout', (req, res) => {
    req.session.user = null;
    res.redirect('/');
  })

};
