var rp = require("request-promise");
var request = require("request");
const {  new_members, about_to_go_inactive, report_data } = require('./data_values');

var uidrequest = (req, res, next) => {
  var _body = choose_values(req.body.ext_option);
  var periodid = req.body.periodid;
  _body.periodid = periodid;
  console.log();
  const options = {
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
    console.log("response", response);
    req.reportid = response.reportid;
    req.guid = response.guid;
    req.periodid = periodid;
    next();
  }).catch((e) => {
    console.log("Couldn't get Guid");
  })
};

const choose_values = function(option){
  switch(option){
    case 0:
    return new_members.values;
    case 1:
    return about_to_go_inactive.values;
    case 2:
    return report_data.values;
    default:
    return new_members.values;
  }
}

module.exports = { uidrequest };
