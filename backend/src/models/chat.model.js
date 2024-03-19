const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  participants: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],
  messages: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Message",
    },
  ],
  timestamps: true,
});

const ChatModel = mongoose.model("Chat", ChatSchema);
module.exports = ChatModel;
