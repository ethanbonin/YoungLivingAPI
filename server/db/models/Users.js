const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  memberid: String,
  is_trial: false,
  signed_up: Date,
  is_member: Date,
  member_name: String,
  agreed_to_terms: Boolean
});


userSchema.statics.findByCredentials = function(memberid) {
  var User = this;
  return User.findOne({ memberid }).then(user => {
    if (!user) {
      return Promise.reject();
    }
    return Promise.resolve(user);
  });
};

var User = mongoose.model("users", userSchema);

module.exports = {
  User: User
};
