var rp = require('request-promise');
var request = require('request');



var uidrequest = (req, res, next) => {
  var _body = req.body.values;
  var options = {
    method: 'POST',
    uri: 'https://www.youngliving.com/vo.dlv.api//reportdata/v2/load',
    headers: {
      'Content-Type': 'application/json',
      'authtoken':`${req.headers["authtoken"]}`
    },
    body: JSON.stringify(_body)
    };
  rp(options).then((body) => {
    var response = JSON.parse(body);
    req.reportid = response.reportid
    req.guid = response.guid
    next();
  });
};


module.exports = {uidrequest};
