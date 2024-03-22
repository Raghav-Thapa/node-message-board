const bcrypt = require("bcryptjs");
const userServ = require("../service/user.service");
const chatServ = require("../service/chat.service");
const dotenv = require("dotenv");
dotenv.config();

class ChatController {

  getUserConversations = async(req, res) => {
  const userId = req.user?.userId;

  try {
    const conversations = await chatServ.getUserConversations(userId);
    res.status(200).json({
      conversations: conversations,
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
  accessChat = async (req, res) => {
    const friendId = req.body.friendId;

    if (!friendId || friendId === req.userId) {
      return res.json(false);
    }

    try {
      const chat = await chatServ.getOrCreateChat(req.userId, friendId);
      return res.json(chat);
    } catch (error) {
      return res.json(error);
    }
  };
  

  fetchChats = async (req, res) => {
    try {
      const chats = await chatServ.getChats(req.user._id);
      return res.status(200).json(chats);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  fetchChatHistory = async (req, res) => {
    const { user1Id, user2Id } = req.params;
    try {
      const chatHistory = await chatServ.fetchChatHistory(user1Id, user2Id);
      return res.status(200).json(chatHistory);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  sendMessage = async (req, res) => {
    const { fromUserId, toUserId, message } = req.body;

    try {
      const updatedChat = await chatServ.sendMessage(
        fromUserId,
        toUserId,
        message
      );
      return res.status(200).json(updatedChat);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

}

const chatCtrl = new ChatController();
module.exports = chatCtrl;
