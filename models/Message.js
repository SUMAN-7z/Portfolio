const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  Message: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;

