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

var {
  report_data_header,
  about_to_go_inactive_header,
  new_members_header
} = require("../header_data/header_data");

const { User } = require("../db/models/Users");
const { Prospects } = require("../db/models/Prospects");
const { ProspectLabels } = require("../db/models/ProspectLabels");

module.exports = app => {
  const formatNotes = function(note) {
    const n = {
      message: note,
      date: new Date()
    };
    return n;
  };

  app.get('/v0/yl/prospect_labels', (req,res) => {
    if (!req.session.user) {
      res.status(401).send({ error: "unauthorized" });
    }


    ProspectLabels.find({
      memberid: req.session.user.user.memberid
    })
      .then(prospectslabels => {
        res.send({ prospectslabels });
      })
      .catch(e => {
        console.log("Error", e);
      });
  })

  app.post("/v0/yl/prospect_labels_update", (req, res) => {
    const updated_master = {
      memberid: req.session.user.user.memberid,
      labels: req.body.values
    }
    ProspectLabels.findOneAndUpdate(
      { _id: req.body._id },
      updated_master,
      { upsert: true },
      function(error, result) {
        if (error) {
          console.log("Something wrong when updating data for master list!", error);
        }
        res.status(200).send(result)
      }
    );
  })


  app.post("/v0/yl/prospect_new", (req, res) => {
    if (!req.session.user) {
      res.status(401).send({ error: "unauthorized" });
    }

    if (req.body.values.editingProspect) {
      let old_notes = req.body.values.old_notes
      let form_new_note = formatNotes(req.body.values.additional_notes);
      old_notes.push(form_new_note);

      const updated_prospect = new Prospects({
        _id: req.body.values._id,
        first: req.body.values.first,
        last: req.body.values.last,
        email: req.body.values.email,
        phone: req.body.values.phone,
        invite_to_class: req.body.values.invite_to_class,
        add_facebook_group: req.body.values.add_facebook_group,
        texting_marketing: req.body.values.texting_marketing,
        host_a_class: req.body.values.host_a_class,
        emailed: req.body.values.emailed,
        know_them: req.body.values.know_them,
        health_needs: req.body.values.health_needs,
        family: req.body.values.family,
        occupation: req.body.values.occupation,
        recreation: req.body.values.recreation,
        additional_notes: old_notes,
        closedDeal: req.body.values.closedDeal,
        met_date: req.body.values.met_date,
        labels: req.body.values.labels,
        lead: req.body.values.lead,
        address: req.body.values.address,
        prospect_created: req.body.values.prospect_created,
        _creator: req.session.user.user.memberid
      });

      Prospects.findOneAndUpdate(
        { _id: req.body.values._id },
        updated_prospect,
        { upsert: true },
        function(error, result) {
          if (error) {
            console.log("Something wrong when updating data!", error);
          }
          res.status(200).send(result)
        }
      );
    } else {
      var prospect = new Prospects({
        _id: req.body.values._id,
        first: req.body.values.first,
        last: req.body.values.last,
        email: req.body.values.email,
        phone: req.body.values.phone,
        invite_to_class: req.body.values.invite_to_class,
        add_facebook_group: req.body.values.add_facebook_group,
        texting_marketing: req.body.values.texting_marketing,
        host_a_class: req.body.values.host_a_class,
        emailed: req.body.values.emailed,
        know_them: req.body.values.know_them,
        health_needs: req.body.values.health_needs,
        family: req.body.values.family,
        occupation: req.body.values.occupation,
        recreation: req.body.values.recreation,
        additional_notes: [formatNotes(req.body.values.additional_notes)],
        closedDeal: req.body.values.closedDeal,
        met_date: req.body.values.met_date,
        labels: req.body.values.labels,
        lead: req.body.values.lead,
        address: req.body.values.address,
        prospect_created: new Date(),
        _creator: req.session.user.user.memberid
      });

      prospect.save().then(
        doc => {
          res.send(doc);
        },
        e => {
          res.status(400).send(e);
        }
      );
    }


  });

  app.get("/v0/yl/prospects", (req, res) => {
    if (!req.session.user) {
      res.send({});
    } else {
      Prospects.find({
        _creator: req.session.user.user.memberid
      })
        .then(prospects => {
          res.send({ prospects });
        })
        .catch(e => {
          console.log("Error", e);
        });
    }
  });

  app.delete("/v0/yl/prospects/delete", (req, res) => {
    var id = req.body._id;
    Prospects.findOneAndRemove({ _id: id })
      .then(doc => {
        if (!doc) {
          return res.status(404).send();
        }
        res.send({ doc });
      })
      .catch(e => {
        res.status(400).send();
      });
  });

  app.patch("/v0/yl/prospects/update", (req, res) => {
    const id = req.body.message._id;
    const message = req.body.message.message;
    const date = new Date();

    const new_note = {
      message,
      date
    };

    Prospects.findOneAndUpdate(
      { _id: id },
      { $push: { additional_notes: new_note } }
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

  app.patch("/v0/yl/prospects/toggle", (req, res) => {
    const id = req.body.toggle._id;
    const value_to_toggle = req.body.toggle.value_to_toggle;
    const truthy = req.body.toggle.truthy;

    const obj = {};
    obj[value_to_toggle] = truthy;

    Prospects.findOneAndUpdate({ _id: id }, { $set: obj })
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

  app.patch("/v0/yl/prospects/close_deal", (req, res) => {
    const id = req.body.closed._id;
    const date = new Date();

    Prospects.findOneAndUpdate({ _id: id }, { $set: { closedDeal: date } })
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
