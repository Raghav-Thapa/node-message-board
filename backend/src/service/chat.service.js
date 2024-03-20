const ChatModel = require("../models/chat.model");
const UserModel = require("../models/user.model");

class ChatService {
  getOrCreateChat = async (userId, friendId) => {
    let chat = await this.getChat(userId, friendId);

    if (chat.length > 0) {
      return chat[0];
    }

    const chatData = {
      chatName: "sender",
      //   isGroupChat: false,
      users: [userId, friendId],
    };
    const createdChat = await ChatModel.create(chatData);
    const fullChat = await ChatModel.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );
    return fullChat;
  };

  async getChat(userId, friendId) {
    let chat = await ChatModel.find({
      //   isGroup: false,
      $and: [
        { users: { $elemMatch: { $eq: userId } } },
        { users: { $elemMatch: { $eq: friendId } } },
      ],
    })
      .populate("users", "-password")
      .populate("lastMsg");

    chat = await UserModel.populate(chat, {
      path: "lastMsg.sender",
      select: "name pictureUrl email",
    });

    return chat;
  }

  async getChats(userId) {
    let chats = await ChatModel.find({ users: { $elemMatch: { $eq: userId } } })
      .populate("users", "-password -updatedAt -createdAt -__v")
      .populate("lastMsg")
      .sort({ updatedAt: -1 });

    chats = await UserModel.populate(chats, {
      path: "lastMsg.sender",
      select: "fullName username email avatar",
    });

    return chats;
  }
}

const chatServ = new ChatService();
module.exports = chatServ;



