const express = require("express");
const app = express.Router();
const authCheck = require("../middleware/auth.middleware.js");
const chatCtrl = require("../controler/chat.controller.js");

app.get("/", authCheck, chatCtrl.getUserConversations);

module.exports = app;
