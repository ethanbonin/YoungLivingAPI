var mongoose = require('mongoose');
const { Schema } = mongoose;

const prospectsLabelSchema = new Schema({
  memberid: String,
  labels: [String]
});

var ProspectLabels = mongoose.model("prospects labels", prospectsLabelSchema);


module.exports = {
  ProspectLabels: ProspectLabels,
}
