require("./config/config");
var fs = require("fs");

//THIRD PARTY MODULES
const express = require("express");
var csvjson = require("csvjson");
var request = require("request");
var rp = require("request-promise");
const bodyParser = require("body-parser");

var { uidrequest } = require("./middleware/uidrequest");
var { retailcustomers } = require("./middleware/retailcustomers");
var {
  report_data_header,
  about_to_go_inactive_header,
  new_members_header
} = require("./header_data/header_data");
var app = express();

const _PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

var website = {
  host: "youngliving.com"
};

var user_tokens = new Map();

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
      res.send(body);
    })
    .catch(e => {
      console.log("ERROR: " + e);
    });
});

app.get("/v0/yl/profile", (req, res) => {
  var uri = "https://www.youngliving.com/api/accounts/my-profile/my-profile";
  var request_options = {
    method: "GET",
    headers: { authtoken: `${req.headers["authtoken"]}` },
    uri: uri
  };
  rp(request_options)
    .then(body => {
      res.send(body);
    })
    .catch(e => {
      res.send(e);
    });
});

app.get("/v0/yl/downline", (req, res) => {
  var periodid = get_period();
  var uri =
    "https://www.youngliving.com/vo.dlv.api//downline/children/user/" +
    periodid;
  var request_options = {
    method: "GET",
    headers: { authtoken: `${req.headers["authtoken"]}` },
    uri: uri
  };
  rp(request_options)
    .then(body => {
      res.send(body);
    })
    .catch(e => {
      res.send(e);
    });
});

app.post("/v0/yl/report_data", uidrequest, retailcustomers, (req, res) => {
  var uri =
    "https://www.youngliving.com/vo.dlv.api/reports/download/All Accounts/" +
    req.reportid +
    "/" +
    req.guid +
    "/1/en-us";
  var request_options = {
    method: "GET",
    uri: uri
  };
  rp(request_options)
    .then(body => {
      var csv_options = {
        deliemiter: ",",
        quote: '"', // optional
        headers: report_data_header
      };


      var result = csvjson.toObject(body, csv_options);
      var all_members = is_retail_customer(req.retail_customers, result);

      fs.writeFileSync("Youngliving.json", JSON.stringify(all_members));
      res.send(all_members);
    })
    .catch(e => {
      res.send(e);
    });
});

app.post("/v0/yl/about_to_go_inactive", uidrequest, (req, res) => {
  var uri = `https://www.youngliving.com/vo.dlv.api/reports/download/About%20To%20Go%20Inactive/${req.reportid}/${req.guid}/1/en-us`;
  var request_options = {
    method: "GET",
    uri: uri
  };
  rp(request_options)
    .then(body => {
      var csv_options = {
        deliemiter: ",",
        quote: '"', // optional
        headers: about_to_go_inactive_header
      };
      var result = csvjson.toObject(body, csv_options);
      res.send(result);
    })
    .catch(e => {
      res.send(e);
    });
});

app.post("/v0/yl/rank_status", (req, res) => {
  var period = req.body.period;
  var uri =
    "https://www.youngliving.com/vo.dlv.api//downline/qualification/user/" +
    period;
  var request_options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      AuthToken: `${req.headers["authtoken"]}`
    },
    uri: uri
  };
  rp(request_options)
    .then(body => {
      var response = JSON.parse(body);
      res.send(body);
    })
    .catch(e => {
      res.send(e);
    });
});

app.post("/v0/yl/new_members", uidrequest, (req, res) => {
  var uri = `https://www.youngliving.com/vo.dlv.api/reports/download/New Members/${req.reportid}/${req.guid}/1/en-US`;
  var request_options = {
    method: "GET",
    uri: uri
  };
  rp(request_options)
    .then(body => {
      var csv_options = {
        deliemiter: ",",
        quote: '"', // optional
        headers: new_members_header
      };
      var result = csvjson.toObject(body, csv_options);
      res.send(result);
    })
    .catch(e => {
      res.send(e);
    });
});

//***************//
//PRIVATE METHODS//
//***************//

get_period = function(date) {
  date = date instanceof Date ? date : new Date();
  return date.getFullYear() * 12 + date.getMonth() + 1 - (2014 * 12 + 5) + 400;
};

is_retail_customer = function(retail_customers, all_members) {

  retail_customers.forEach((retail_customer) => {
    all_members.forEach((person) => {
      if (person.is_retail == true){
        return;
      }
      if (retail_customer.memberid == person.memberid){
        person.is_retail = true;
        return;
      } else {
        person.is_retail = false;
      }
    })

  });

  return all_members;
}

app.listen(_PORT, () => {
  console.log("Running on port: " + _PORT);
});

module.exports = { app };
