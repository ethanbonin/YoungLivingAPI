var unilevel_bonus = (person, level, yl_data, legs, sponsor, diff) => {
  var amount = 0;

// if (person.memberid == 11973675){
  if (sponsor[sponsor.length - 1].level != 1) {
    var sponsorid = sponsor[sponsor.length - 1].sponsorid;
    var spon = yl_data[sponsorid];
    if (sponsorid == 14528 || sponsorid == undefined) {
      return amount;
    }
    if (spon.pv >= 100) {
      level++;
    }
  } else {
    var spon = sponsor[sponsor.length - 1];
  }
  if (spon.level == 1) {
    if (spon.pv < 100) {
      if (level == 0) {
        level++;
      } else if (level != 1) {
        level--;
      }

      if (person.is_retail) {
        level--;
      }
      if (diff[0] || diff[1] <= 31) {
        if (person.pv > 800){
          amount = ((person.pv-800)+240) * level_percent(level)
        } else {
          amount = person.pv * 0.3 * level_percent(level);
        }
      } else {
        amount = person.pv * level_percent(level);
      }
    } else {
      level++;

      if (person.is_retail) {
        level--;
      }

      if (diff[0] || diff[1] <= 31) {
        if (person.pv > 800){
          amount = ((person.pv-800)+240) * level_percent(level)
        } else {
          amount = person.pv * 0.3 * level_percent(level);
        }
      } else {
        amount = person.pv * level_percent(level);
      }
    }
  } else {
    sponsor.push(spon);
    return unilevel_bonus(person, level, yl_data, legs, sponsor, diff);
  }
// }


  return amount;
};

var level_percent = level => {
  switch (level) {
    case 1:
      return 0.08;
      break;
    case 2:
      return 0.05;
      break;
    case 3:
      return 0.04;
      break;
    case 4:
      return 0.04;
      break;
    case 5:
      return 0.04;
      break;
    default:
      return 0.04;
      break;
  }
};

module.exports = {
  unilevel_bonus
};
