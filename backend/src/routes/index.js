const express = require("express");
const app = express.Router();

const authRoutes = require("./auth.routes");
const chatRoutes = require("./chat.routes");
const messageRoutes = require("./message.routes");

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

module.exports = app;
