const express = require("express");
const app = express();
const router = require("./src/routes/index");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { Server } = require("socket.io");
const msgServ = require("./src/service/message.service");

const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
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

const server = app.listen(PORT, () => {
  console.log("Server is running");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);

    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

msgServ.setIo(io);
