const MessageModel = require("../models/message.model")
const ChatModel = require("../models/chat.model")
const UserModel = require("../models/user.model")

class MessageService {
  // async createMessage(senderId, content, chatId) {
  //   const newMessage = {
  //     sender: senderId,
  //     content: content,
  //     chat: chatId,
  //   };

  //   let message = await MessageModel.create(newMessage);

  //   message = await message.populate("sender", "fullName avatar");
  //   message = await message.populate("chat");
  //   message = await UserModel.populate(message, {
  //     path: "chat.users",
  //     select: "fullName username email avatar",
  //   });

  //   await ChatModel.findByIdAndUpdate(chatId, {
  //     latestMessage: message,
  //   });

  //   return message;
  // }

  // async getMessages(chatId) {
  //   const messages = await MessageModel.find({ chat: chatId })
  //     .populate("sender", "fullName avatar email username")
  //     .populate("chat");

  //   return messages;
  // }

  async getMessages(senderId, receiverId) {
    const conversation = await ChatModel.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
// console.log(conversation);
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

    conversation.messages.push(message._id);
    await conversation.save();

    return message;
  }
}


const msgServ = new MessageService();
module.exports = msgServ;
