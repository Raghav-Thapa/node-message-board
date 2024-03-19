const bcrypt = require("bcryptjs");
const userServ = require("../service/user.service");

class AuthController {
  register = async (req, res, next) => {
    try {
      let registerData = req.body;
      //   console.log(registerData)
      userServ.validatedata(registerData);
      registerData.password = bcrypt.hashSync(registerData.password, 10);
      let registerResponse = await userServ.registerUser(registerData);
      if (registerResponse) {
        res.json({
          result: registerData,
          msg: "user registered successfully",
          status: true,
        });
      } else {
        next({ status: 400, msg: "user cannot be registered at this moment" });
      }
    } catch (exception) {
      console.log(exception);
      next(exception);
    }
  };

  login = async (req, res, next) => {
    try {
      let payload = req.body;
      if (!payload.email || !payload.password) {
        next({ status: 400, msg: "Credentials required" });
      }
      let userDetail = await userServ.getUserByEmail(payload.email);
      if (!userDetail) {
        next({ status: 400, msg: "User not found" });
      } else if (bcrypt.compareSync(payload.password, userDetail.password)) {
        res.json({
          //  result:payload
          result: {
            data: userDetail,
          },
          status: true,
          msg: "you are logged in",
        });
      } else {
        next({ status: 400, msg: "Credentials does not match" });
      }
    } catch (exception) {
      next({ status: 400, msg: "Query exception. View console" });
    }
  };
}

const authCtrl = new AuthController();
module.exports = authCtrl;
