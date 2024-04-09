const MessageModel = require("../models/message.model");
const ChatModel = require("../models/chat.model");

class MessageService {
  setIo(io) {
    this.io = io;
  }
  async getMessages(senderId, receiverId) {
    const conversation = await ChatModel.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    return conversation?.messages || [];
  }

  async sendMessage(senderId, receiverId, messageBody) {
    const participants = [senderId, receiverId];
    let conversation = await ChatModel.findOne({
      participants: { $all: participants },
    });
    if (!conversation) {
      try {
        conversation = await ChatModel.create({
          participants,
        });
      } catch (error) {
        console.error("Error creating conversation:", error);
        throw error;
      }
    }

    const newMessage = new MessageModel({
      ...messageBody,
      senderId,
      receiverId,
    });

    const message = await MessageModel.create(newMessage);
     this.io.emit("chat message", message);
    conversation.messages.push(message._id);
    await conversation.save();

    return message;
  }
}

const msgServ = new MessageService();
module.exports = msgServ;
