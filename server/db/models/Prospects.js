var mongoose = require('mongoose');

var Prospects = mongoose.model('Prospects', {
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
  additional_notes: String,
  closedDeal: String,
  met_date: String,
  _creator: {
    type: String,
    required: true,
  }
});

module.exports = {
  Prospects: Prospects,
}
