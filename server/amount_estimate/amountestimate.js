const {formatDate, create_hashmap, get_legs} = require('./amount_helpers/helperfunctions');
const {fast_start_bonus, isFastStart, isTwoLevelsDeep} = require('./amount_helpers/faststart');
const {unilevel_bonus} = require('./amount_helpers/unilevel');
const _ = require("lodash");



var amount_made = (yl_data, current_date) => {
  console.log("MADE IT IN HERE")
  console.log(yl_data);
  //Format data
  yl_data_updated = formatDate(yl_data);
  var legs = get_legs(yl_data);
  legs = create_hashmap(legs);
  yl_data_updated = create_hashmap(yl_data);
  var current_date = current_date;


  //Create variables for final result
  var payment_amount = 0.0;
  var fast_start_amount = 0.0;
  var uni_level_amount = 0.0;
  var head_key = _.findKey(yl_data_updated, { level: "0" });
  var head_person = yl_data_updated[head_key];
  var fast_start_people = [];
  var uni_level_people = [];

  for (var id in yl_data_updated) {
    var is_fast = false;
    if (id != "memberid" && yl_data_updated[id] != head_person) {

      var diff = isFastStart(current_date, yl_data_updated[id].signupdate, yl_data_updated[id]);
      var two_levesl_confirmed = isTwoLevelsDeep(
        head_person,
        yl_data_updated[id],
        yl_data_updated
      );

      diff[2] = two_levesl_confirmed;

      if (diff[0] && two_levesl_confirmed) {
        var amount = fast_start_bonus(head_person, id, diff[1], yl_data_updated);
        payment_amount = payment_amount + amount;
        fast_start_amount = fast_start_amount + amount;
        if (amount != 0) {
          var person = yl_data_updated[id];
          fast_start_people.push([Number(person.memberid),person.name, amount]);
        }
        is_fast = true;
      }

      var amount = unilevel_bonus(
        yl_data_updated[id],
        0,
        yl_data_updated,
        legs,
        [yl_data_updated[id]],
        diff
      );

      if (amount != 0) {
        var person = yl_data_updated[id];
        uni_level_people.push([Number(person.memberid),person.name, amount]);
      }
      uni_level_amount = uni_level_amount + amount;
      payment_amount = payment_amount + amount;
    }
  }


  // console.log(a.length);
  console.log("Fast Start People:", fast_start_people);
  console.log("Fast Start Amount:", fast_start_amount);
  console.log("Unilevel Amount:", uni_level_amount);
  console.log("Total amount", payment_amount);
  console.log('--------------\n')
  var estimates = {
    "fast_start_amount": fast_start_amount,
    "uni_level_amount": uni_level_amount,
    "total_payment": payment_amount,
    "fast_start_people": fast_start_people,
    "unilevel_people": uni_level_people
  }
  return estimates;
};


module.exports = {
  amount_made
}
