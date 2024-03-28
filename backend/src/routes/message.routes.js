const express = require("express");
const app = express.Router();
const authCheck = require("../middleware/auth.middleware");
const msgCtrl = require("../controler/message.controller");
const uploader = require("../middleware/uploader.middleware");

const uploadPath =(req,res,next) => {
    req.uploadPath ="./public/chat"
    next()

}

// app.post("/send/:id", authCheck, msgCtrl.sendMessage);
app.post(
  "/send/:id",
  authCheck,
  uploadPath,
  uploader.array("images"),
  msgCtrl.sendMessage
);
app.get("/:id", authCheck, msgCtrl.getMessages);

// app.get("/", function (req, res, next) {
//   res.json({ msg: "get message!" });
// });

module.exports = app;
