const msgServ = require("../service/message.service");
const dotenv = require("dotenv");
dotenv.config();

class MessageController {
  sendMessage = async (req, res) => {
    const { content, chatId } = req.body;
    if (!content || !chatId)
      return res.status(400).json({ msg: "chatId or content is required" });

    try {
      const message = await msgServ.createMessage(
        req.user._id,
        content,
        chatId
      );
      return res.status(200).json(message);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  allMessages = async (req, res) => {
    try {
      const messages = await msgServ.getMessages(req.params.chatId);
      return res.json(messages);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };
}

const msgCtrl = new MessageController();
module.exports = msgCtrl;


