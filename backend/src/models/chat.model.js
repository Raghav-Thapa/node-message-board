const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
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
        ref: "Message",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);

const ChatModel = mongoose.model("Chat", ChatSchema);
module.exports = ChatModel;
