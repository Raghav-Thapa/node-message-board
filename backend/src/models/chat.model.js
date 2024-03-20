const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  users: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],
  lastMsg: {
    type: mongoose.Types.ObjectId,
    ref: "Message",
    default: null,
  },
  groupAdmin: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  // messages: [
  //   {
  //     type: mongoose.Types.ObjectId,
  //     required: true,
  //     ref: "Message",
  //   },
  // ],
  timestamps: true,
});

const ChatModel = mongoose.model("Chat", ChatSchema);
module.exports = ChatModel;
