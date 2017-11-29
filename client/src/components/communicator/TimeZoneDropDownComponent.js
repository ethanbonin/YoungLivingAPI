import React from "react";
import { Dropdown } from "semantic-ui-react";
const momentTimeZone = require("moment-timezone");


const TimeZoneDropDown = (data) => {

  const getTimeZones = function() {
    let timeZones = [];
    momentTimeZone.tz.names().forEach(timeZone => {
      timeZones.push({
        key: timeZone,
        value: timeZone,
        text: timeZone
      });
    });
    return timeZones;
  }

  const handleTimeZoneOption = (e, {value}) => {
    data.handleTimeZoneOption(value);
  }

  return (
    <Dropdown
      placeholder="Time Zones"
      search
      selection
      value={data.timeZone}
      options={getTimeZones()}
      onChange={handleTimeZoneOption}
    />
  );
};

export default TimeZoneDropDown;
