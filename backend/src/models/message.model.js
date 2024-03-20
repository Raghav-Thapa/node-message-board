const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    sender: {
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
    },
    chat: {
      type: mongoose.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);

const MessageModel = mongoose.model("Message", MessageSchema);
module.exports = MessageModel;
