var report_values_all = {
  reportid: "all-members",
  periodid: 440,
  sortby: "",
  sortdesc: 1,
  pagenumber: 1,
  download: "true",
  format: "CSV",
  reportname: "Members (Distributors)",
  columns: [
    { id: "name" },
    { id: "level" },
    { id: "memberid" },
    { id: "pv" },
    { id: "ogv" },
    { id: "pgv" },
    { id: "autoship" },
    { id: "email" },
    { id: "signupdate" },
    { id: "lastorderdate" },
    { id: "previousrank" },
    { id: "pvassistant" },
    { id: "hasautoship" },
    { id: "sponsorid" },
    { id: "lastorderpv" },
    { id: "currentrank" },
    { id: "forecastpv" },
    { id: "status" },
    { id: "address" },
    { id: "scheduledpv" },
    { id: "rankchange" },
    { id: "highestpaidrank" },
    { id: "enrollerid" },
    { id: "autoshippv" }
  ]
};

var report_values_inactive = {
  values: {
    reportid: "near-inactive",
    periodid: 440,
    sortby: "",
    sortdesc: 1,
    pagenumber: 1,
    download: "true",
    format: "CSV",
    reportname: "About To Go Inactive",
    columns: [
      { id: "name" },
      { id: "level" },
      { id: "memberid" },
      { id: "pv" },
      { id: "ogv" },
      { id: "pgv" },
      { id: "autoship" },
      { id: "email" },
      { id: "signupdate" },
      { id: "lastorderdate" },
      { id: "previousrank" },
      { id: "pvassistant" },
      { id: "status" },
      { id: "forecastpv" },
      { id: "currentrank" },
      { id: "lastorderpv" },
      { id: "sponsorid" },
      { id: "hasautoship" },
      { id: "autoshippv" },
      { id: "enrollerid" },
      { id: "highestpaidrank" },
      { id: "rankchange" },
      { id: "scheduledpv" },
      { id: "address" }
    ]
  }
};

module.exports = {
  report_values_all,
  report_values_inactive
};
