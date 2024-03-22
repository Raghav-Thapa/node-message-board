const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  slug: {
    type: String,
  },

  friends: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  // friends: [
  //   {
  //     user: {
  //       type: mongoose.Types.ObjectId,
  //       // required: true,
  //       ref: "User",
  //     },
  //     chat: {
  //       type: mongoose.Types.ObjectId,
  //       // required: true,
  //       ref: "Chat",
  //     },
  //   },
  // ],
});

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel
