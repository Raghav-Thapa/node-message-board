const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imgUrl: {
    type: String,
    trim: true,
  },
  timestamps: true,
});

const MessageModel = mongoose.model("Message", MessageSchema);
module.exports = MessageModel;
