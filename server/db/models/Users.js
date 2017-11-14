const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  memberid: String,
  is_trial: false,
  signed_up: Date,
  is_member: Date,
  member_name: String,
  phoneNumber: String,
  agreed_to_terms: Boolean,
  agreed_to_terms_date: Date
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


userSchema.statics.updatePhoneNumebr = function(memberid, phoneNumber) {
  var User = this;
  return User.findOne({memberid: memberid}).then((err,user) => {
    if (err){
      return {err: "Error in saving Phone Number"}
    }
    user.phoneNumber = phoneNumber
    user.save();
  })
}


var User = mongoose.model("users", userSchema);

module.exports = {
  User: User
};
