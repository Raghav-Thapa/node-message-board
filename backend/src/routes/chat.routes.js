const express = require("express");
const app = express.Router();
// const authCheck = require("../middleware/auth.middleware");

// const uploadPath =(req,res,next) => {
//     req.uploadPath ="./public/user"
//     next()

// }
// app.post("/", function (req, res, next) {
//   res.json({ msg: "chat post!" });
// });
app.get("/", function (req, res, next) {
  res.json({ msg: " chat get!" });
});

module.exports = app;
