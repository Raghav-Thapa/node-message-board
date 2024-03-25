const express = require("express");
const app = express.Router();
const authCtrl = require("../controler/auth.controller");
const authCheck = require("../middleware/auth.middleware");
const multer = require("multer");
const uploader = require("../middleware/uploader.middleware");

const uploadPath = (req, res, next) => {
  req.uploadPath = "./public/user";
  next();
};

app.post("/register", uploadPath, uploader.single("image"), authCtrl.register);
app.post("/login", authCtrl.login);
app.get("/me", authCheck, authCtrl.getLoggedInUser);
app.get("/all", authCtrl.getAllUser);
app.get("/:id",  authCtrl.getUserById);
app.put("/:id", uploadPath, uploader.single("image"), authCtrl.handleUserUpdate);

module.exports = app;
