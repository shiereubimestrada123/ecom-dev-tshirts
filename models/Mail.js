const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NodeMailerSchema = new Schema({
  email: {
    type: String,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
});

module.exports = Mail = mongoose.model('mail', NodeMailerSchema);
