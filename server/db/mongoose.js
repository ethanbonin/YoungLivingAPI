var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var env = process.env.NODE_ENV || 'development';


if (env != "production"){
  //Development
  mongoose.connect(process.env.MONGODB_URI);
}else {
  //Production
  mongoose.connect(process.env.MONGOLAB_BLACK_URI);
}

module.exports = {
  mongoose: mongoose
};
