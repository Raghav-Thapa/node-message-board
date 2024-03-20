const bcrypt = require("bcryptjs");
const userServ = require("../service/user.service");
const chatServ = require("../service/chat.service");
const dotenv = require("dotenv");
dotenv.config();

class ChatController {
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
}

const chatCtrl = new ChatController();
module.exports = chatCtrl;
