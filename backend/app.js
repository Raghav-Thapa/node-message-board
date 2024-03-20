const express = require("express");
const app = express();
const router = require("./src/routes/index");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/assets/", express.static(process.cwd() + "/public/"));

app.use("/api", router);

const MongoUrl =
  "mongodb+srv://raghav:raghav1234@cluster0.aguznsx.mongodb.net/MessagingApp";

mongoose.connect(MongoUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB connection error"));
db.once("open", function () {
  console.log("DB connection established");
});


app.use((error, req, res, next) => {
  let status = error && error.status ? error.status : 500;
  let msg = error && error.msg ? error.msg : "internal server error";
  console.log(error);

  res.status(status).json({
    result: null,
    status: false,
    msg: msg,
    meta: null,
  });
});

app.listen(PORT, () => {
  console.log("Server is running");
});

