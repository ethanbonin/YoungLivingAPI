var mongoose = require("mongoose");
const { Schema } = mongoose;

const prospectSchema = new Schema({
  first: String,
  last: String,
  email: String,
  phone: String,
  invite_to_class: Boolean,
  add_facebook_group: Boolean,
  texting_marketing: Boolean,
  host_a_class: Boolean,
  emailed: Boolean,
  know_them: String,
  health_needs: String,
  family: String,
  occupation: String,
  recreation: String,
  additional_notes: [{}],
  closedDeal: String,
  met_date: Date,
  lead: String,
  labels: [
    {
      key: String,
      text: String,
      value: String
    }
  ],
  address: {
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String
  },
  prospect_created: Date,
  _creator: {
    type: String,
    required: true
  }
});

var Prospects = mongoose.model("prospects", prospectSchema);

module.exports = {
  Prospects: Prospects
};
