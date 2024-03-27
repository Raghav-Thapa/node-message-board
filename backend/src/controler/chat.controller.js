const chatServ = require("../service/chat.service");
const dotenv = require("dotenv");
dotenv.config();

class ChatController {
  getUserConversations = async (req, res) => {
    const userId = req.user?.userId;

    try {
      const conversations = await chatServ.getUserConversations(userId);
      res.status(200).json({
        conversations: conversations,
      });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  };
}

const chatCtrl = new ChatController();
module.exports = chatCtrl;
