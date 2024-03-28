const msgServ = require("../service/message.service");
const dotenv = require("dotenv");
dotenv.config();

class MessageController {
  getMessages = async (req, res) => {
    const senderId = req.user?._id;
    const receiverId = req.params.id;
    try {
      const messages = await msgServ.getMessages(senderId, receiverId);
      res.status(200).json({
        messages: messages,
      });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  };

  sendMessage = async (req, res) => {
    const { content, participants } = req.body;
    const senderId = req.user?._id;
    const receiverId = req.params.id;
    try {
      let data = req.body;
      if (req.files) {
        data.images = req.files.map((item) => {
          return item.filename;
        });
      }
      const message = await msgServ.sendMessage(senderId, receiverId, {
        content,
        participants,
        images: data.images,
      });
      res.status(201).json({
        message,
      });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  };
}

const msgCtrl = new MessageController();
module.exports = msgCtrl;
