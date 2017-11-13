import React from 'react'
import _ from 'lodash';
import {Label, Item } from "semantic-ui-react";

const StaticInfo = (data) => {
  const headerValue = {
    know_them: "How do you Know Them",
    health_needs: "Health Needs",
    family: "Family Details",
    occupation: "Occupation",
    recreation: "Hobbies"
  };

  return _.map(data.data, (value, key) => {
    var truth = false;
    truth = _.hasIn(headerValue, key);
    if (truth) {
      return (
        <Item key={headerValue[key]}>
          <Item.Header>
            <Label color="grey" size={"medium"}>
              {headerValue[key]}
            </Label>
          </Item.Header>
          <Item.Meta style={{ marginLeft: "15px" }}>{value}</Item.Meta>
        </Item>
      );
    }
  });
}


export default StaticInfo
