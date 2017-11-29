const new_members = {
  values: {
    reportid: "new-members",
    periodid: 438,
    sortby: "",
    sortdesc: 1,
    pagenumber: 1,
    download: "true",
    format: "CSV",
    reportname: "New Members",
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

const about_to_go_inactive = {
  values: {
    reportid: "near-inactive",
    periodid: 438,
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
  new_members,
  about_to_go_inactive
};
