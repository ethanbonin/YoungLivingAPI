const _ = require("lodash");

var formatDate = (yl_data) => {
  var months = [
    { Jan: "01" },
    { Feb: "02" },
    { Mar: "03" },
    { Apr: "04" },
    { May: "05" },
    { Jun: "06" },
    { Jul: "07" },
    { Aug: "08" },
    { Sep: "09" },
    { Oct: "10" },
    { Nov: "11" },
    { Dec: "12" }
  ];

  // Jul 18, 2017
  yl_data.forEach(function(person) {
    var s = person.signupdate + '';
    var date_array_s = s.split(" ");

    for (var index in months) {
      for (var key in months[index]) {
        if (date_array_s[0] == key) {
          if (date_array_s[1].match(/\d{2}/)) {
            var date_format = `${date_array_s[2]}-${months[index][
              key
            ]}-${date_array_s[1].replace(/,/, "")}`;
            // console.log(date_format);
            var date = new Date(date_format);

            person.signupdate = date;
          } else {
            var date_format = `${date_array_s[2]}-${months[index][
              key
            ]}-0${date_array_s[1].replace(/,/, "")}`;
            // console.log(date_format);
            var date = new Date(date_format);

            person.signupdate = date;
          }
        }
      }
    }

    var order = person.lastorderdate + '';
    var date_array_o = order.split(" ");

    for (var index in months) {
      for (var key in months[index]) {
        if (date_array_o[0] == key) {
          if (date_array_o[1].match(/\d{2}/)) {
            var date_format = `${date_array_o[2]}-${months[index][
              key
            ]}-${date_array_o[1].replace(/,/, "")}`;
            // console.log(date_format);
            var date = new Date(date_format);

            person.lastorderdate = date;
          } else {
            var date_format = `${date_array_o[2]}-${months[index][
              key
            ]}-0${date_array_o[1].replace(/,/, "")}`;
            // console.log(date_format);
            var date = new Date(date_format);

            person.lastorderdate = date;
          }
        }
      }
    }
  });

  return yl_data;
};

var create_hashmap = yl_data => {
  var hash = _.keyBy(yl_data, "memberid");
  return hash;
};

const get_legs = yl_data => {
  var legs = [];

  yl_data.forEach(person => {
    if (person.signupdate != "signupdate" && person.level != 0) {
      if (person.level == 1) {
        legs.push(person);
      }
    }
  });
  return legs;
};


module.exports = {
  create_hashmap,
  formatDate,
  get_legs
}
