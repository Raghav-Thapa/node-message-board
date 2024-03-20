const express = require("express");
const app = express.Router();
const authCheck = require("../middleware/auth.middleware.js")
const chatCtrl = require("../controler/chat.controller.js")

app.post("/", authCheck, chatCtrl.accessChat);
app.get("/", authCheck, chatCtrl.fetchChats);
// app.get("/", function (req, res, next) {
//   res.json({ msg: " chat get!" });
// });


module.exports = app;
