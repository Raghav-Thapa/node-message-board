const ChatModel = require("../models/chat.model");

class ChatService {

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



