const express = require("express");
const app = express.Router();
const authCheck = require("../middleware/auth.middleware");
const msgCtrl = require("../controler/message.controller");

// const uploadPath =(req,res,next) => {
//     req.uploadPath ="./public/user"
//     next()

// }

app.post("/send/:id", authCheck, msgCtrl.sendMessage);
app.get("/:id", authCheck, msgCtrl.getMessages);

// app.get("/", function (req, res, next) {
//   res.json({ msg: "get message!" });
// });

module.exports = app;
