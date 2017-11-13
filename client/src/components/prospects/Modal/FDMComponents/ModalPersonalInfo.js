import React from 'react'
import _ from 'lodash';
import {Segment, Label } from "semantic-ui-react";

const PersonalInfo = (data) => {
  const headerValue = {
    phone: {
      header: "Phone",
      icon: "phone"
    },
    email: {
      header: "Email",
      icon: "mail"
    }
  };

  return _.map(data.data, (value, key) => {
    var truth = false;
    truth = _.hasIn(headerValue, key);

    if (truth) {
      return (
        <div key={key}>
          <Segment>
            <Label
              color="grey"
              icon={headerValue[key].icon}
              content={headerValue[key].header}
              key={headerValue[key]}
            />
            <span style={{ marginLeft: "4px" }}>{value}</span>
          </Segment>
        </div>
      );
    }
  });
}


export default PersonalInfo
