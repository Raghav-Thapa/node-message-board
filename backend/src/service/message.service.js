const MessageModel = require("../models/message.model")
const ChatModel = require("../models/chat.model")
const UserModel = require("../models/user.model")

class MessageService {

  async createMessage(senderId, content, chatId) {
    const newMessage = {
      sender: senderId,
      content: content,
      chat: chatId,
    };

    let message = await MessageModel.create(newMessage);

    message = await message.populate("sender", "fullName avatar");
    message = await message.populate("chat");
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "fullName username email avatar",
    });

    await ChatModel.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });

    return message;
  }

  async getMessages(chatId) {
    const messages = await MessageModel.find({ chat: chatId })
      .populate("sender", "fullName avatar email username")
      .populate("chat");

    return messages;
  }
}


const msgServ = new MessageService();
module.exports = msgServ;
