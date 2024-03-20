const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    chatName: {
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

  },
  {
    timestamps: true,
    autoIndex: true,
  }
);

const ChatModel = mongoose.model("Chat", ChatSchema);
module.exports = ChatModel;
