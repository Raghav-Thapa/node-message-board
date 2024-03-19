const UserModel = require("../models/user.model");

class UserService {
  validatedata = (data) => {
    if (!data.name) {
      throw { status: 400, msg: "Name required" };
    }
    if (!data.email) {
      throw { status: 400, msg: "Email required" };
    }

    if (!data.password) {
      throw { status: 400, msg: "Password required" };
    }

    // if(data.password.length < 8){
    //     throw {status: 400, msg: "Password must be of atleast 8 characters"}
    // }

    // if(!data.role){
    //     throw {status: 400, msg: "Role required"}
    // }
  };

  registerUser = async (data) => {
    try {
      let user = new UserModel(data);
      return await user.save();
    } catch (exception) {
      throw exception;
    }
  };

  getUserByEmail = async (email) => {
    try {
      let user = UserModel.findOne({
        email: email,
      });
      if (user) {
        return user;
      } else {
        throw "User does not exist";
      }
    } catch (exception) {
      throw exception;
    }
  };
}

const userServ = new UserService();
module.exports = userServ;
