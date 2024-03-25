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

  getUserById = async (id) => {
    try {
      let userDetail = await UserModel.findById(id);
      return userDetail;
    } catch (err) {
      throw err;
    }
  };

  getAllCount = async (filter = {}) => {
    return await UserModel.countDocuments(filter);
  };

  getAllUsers = async ({ perPage = 10, currentPage = 1 }) => {
    try {
      let skip = (currentPage - 1) * perPage;
      let data = await UserModel.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(perPage);
      return data;
    } catch (exception) {
      console.log(exception);
      throw { status: 500, msg: "Querry execution fialed." };
    }
  };

  getUserByFilter = async (filter) => {
    try {
      let userDetail = await UserModel.find(filter);

      // let userDetail = await this._db.collection("users").findOne({
      //     _id: new ObjectId(id)
      // })
      return userDetail;
    } catch (err) {
      throw err;
    }
  };
  
  updateUser = async (id, updateData) => {
    try {
      let updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      return updatedUser;
    } catch (exception) {
      throw exception;
    }
  };
}

const userServ = new UserService();
module.exports = userServ;
