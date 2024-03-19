const express = require("express");
const app = express.Router();
const authCtrl = require("../controler/auth.controller");

app.post("/register", authCtrl.register);
app.post('/login', authCtrl.login)

module.exports = app;
