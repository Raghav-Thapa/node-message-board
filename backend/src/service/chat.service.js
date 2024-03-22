const ChatModel = require("../models/chat.model");
const UserModel = require("../models/user.model");
const MessageModel = require("../models/message.model")

class ChatService {
  // getOrCreateChat = async (userId, friendId) => {
  //   let chat = await this.getChat(userId, friendId);

  //   if (chat.length > 0) {
  //     return chat[0];
  //   }

  //   const chatData = {
  //     chatName: "sender",
  //     //   isGroupChat: false,
  //     users: [userId, friendId],
  //   };
  //   const createdChat = await ChatModel.create(chatData);
  //   const fullChat = await ChatModel.findOne({ _id: createdChat._id }).populate(
  //     "users",
  //     "-password"
  //   );
  //   return fullChat;
  // };

  // async getChat(userId, friendId) {
  //   let chat = await ChatModel.find({
  //     //   isGroup: false,
  //     $and: [
  //       { users: { $elemMatch: { $eq: userId } } },
  //       { users: { $elemMatch: { $eq: friendId } } },
  //     ],
  //   })
  //     .populate("users", "-password")
  //     .populate("lastMsg");

  //   chat = await UserModel.populate(chat, {
  //     path: "lastMsg.sender",
  //     select: "name pictureUrl email",
  //   });

  //   return chat;
  // }

  // async getChats(userId) {
  //   let chats = await ChatModel.find({ users: { $elemMatch: { $eq: userId } } })
  //     .populate("users", "-password -updatedAt -createdAt -__v")
  //     .populate("messages")
  //     .sort({ updatedAt: -1 });

  //   chats = await UserModel.populate(chats, {
  //     path: "lastMsg.sender",
  //     select: "fullName username email avatar",
  //   });

  //   return chats;
  // }

  // fetchChatHistory = async (user1Id, user2Id) => {
  //   let chat = await ChatModel.findOne({
  //     users: { $all: [user1Id, user2Id] },
  //   }).populate("messages");

  //   if (chat) {
  //     return chat.messages;
  //   }

  //   return [];
  // };

  // sendMessage = async (fromUserId, toUserId, messageContent) => {
  //   let chat = await this.getOrCreateChat(fromUserId, toUserId);

  //   // Create a new message
  //   const message = new MessageModel({
  //     sender: fromUserId,
  //     content: messageContent,
  //     chat: chat._id,
  //   });

  //   await message.save();

  //   // Add the message to the chat's messages
  //   chat.messages.push(message);
  //   await chat.save();

  //   return chat.messages;
  // };

  async getUserConversations(userId) {
    const conversations = await ChatModel.find({
      participants: {
        $in: [userId],
      },
    }).populate("participants");

    return conversations || [];
  }
}

const chatServ = new ChatService();
module.exports = chatServ;



