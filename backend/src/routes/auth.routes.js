const express = require("express");
const app = express.Router();
const authCtrl = require("../controler/auth.controller");
const authCheck = require("../middleware/auth.middleware")

app.post("/register", authCtrl.register);
app.post('/login', authCtrl.login)
app.get("/me", authCheck, authCtrl.getLoggedInUser);
app.get("/all", authCheck, authCtrl.getAllUser);

module.exports = app;
