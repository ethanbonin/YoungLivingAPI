var mongoose = require('mongoose');
const { Schema } = mongoose;

const prospectSchema = new Schema({
  first: String,
  last: String,
  email: String,
  phone: String,
  first_call: Boolean,
  mail_sample: Boolean,
  follow_up: Boolean,
  invite_to_class: Boolean,
  add_facebook_group: Boolean,
  texting_marketing: Boolean,
  host_a_class: Boolean,
  know_them: String,
  health_needs: String,
  family: String,
  occupation: String,
  recreation: String,
  additional_notes: [{}],
  closedDeal: String,
  met_date: Date,
  _creator: {
    type: String,
    required: true,
  }
});

var Prospects = mongoose.model("prospects", prospectSchema);


module.exports = {
  Prospects: Prospects,
}
