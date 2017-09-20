var rp = require("request-promise");
var request = require("request");
var csvjson = require("csvjson");

var retailcustomers = (req, res, next) => {
  var _body = {
    reportid: "all-retail",
    periodid: req.body.values.periodid,
    sortby: "",
    sortdesc: 1,
    pagenumber: 1,
    download: "true",
    format: "CSV",
    reportname: "Retail Customers",
    columns: [{ id: "memberid" }, { id: "name" }]
  };
  var periodid = req.body.values.periodid;
  var options = {
    method: "POST",
    uri: "https://www.youngliving.com/vo.dlv.api//reportdata/v2/load",
    headers: {
      "Content-Type": "application/json",
      authtoken: `${req.headers["authtoken"]}`
    },
    body: JSON.stringify(_body)
  };
  rp(options).then(body => {
    var response = JSON.parse(body);
    response.reportid;
    response.guid;
    var uri = `https://www.youngliving.com/vo.dlv.api/reports/download/Retail%20Customers/${response.reportid}/${response.guid}/1/en-US`

    var retail_options = {
      method: "GET",
      uri: uri,
    };
    rp(retail_options).then((body) => {
      var csv_options = {
        deliemiter: ",",
        quote: '"', // optional
        headers: "memberid, name"
      };
      var result = csvjson.toObject(body, csv_options);
      req.retail_customers = result;
      next();
    });
  });
};

module.exports = { retailcustomers };
