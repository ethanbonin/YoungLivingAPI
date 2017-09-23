const _ = require("lodash");

var fast_start_bonus = (head_person, id, diffDays, yl_data) => {
  var amount = 0;

  if (yl_data[id].enrollerid == head_person.memberid) {
    amount = amount + yl_data[id].pv * 0.25;
  } else {
    var enroller = yl_data[id].enrollerid;
    if (yl_data[enroller].enrollerid == head_person.memberid) {
      amount = amount + yl_data[id].pv * 0.1;
    }
  }

  if (amount > 200){
    return 200;
  }

  return amount;
};

const isFastStart = (current_date, person_date, person) => {

  if (!person.is_retail) {
    if (person.lastorderdate != "") {
      var distance_of_order = Math.abs(
        person.lastorderdate.getTime() - person_date.getTime()
      );
      var distance_of_days = Math.ceil(distance_of_order / (1000 * 3600 * 24));
      if (
        distance_of_days > 365 &&
        person.previousrank < 0 &&
        person.rankchange == "Up (New)"
      ) {
        var timeDiff = Math.abs(
          current_date.getTime() - person.lastorderdate.getTime()
        );
        var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
        if (diffDays <= 92) {
          return [true, diffDays];
        }
      }
    }

    var timeDiff = Math.abs(current_date.getTime() - person_date.getTime());
    var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    if (diffDays <= 92) {
      return [true, diffDays];
    }
  }
  return [false, diffDays];
};

const isTwoLevelsDeep = (head_person, person, yl_data) => {
  var enroller = person.enrollerid;
  if (enroller != 0 && person.is_retail == false) {
    if (person.enrollerid == head_person.memberid) {
      return true;
    } else if (yl_data[enroller].enrollerid == head_person.memberid) {
      return true;
    }
  }
  return false;
};

module.exports = {
  fast_start_bonus,
  isFastStart,
  isTwoLevelsDeep
};
