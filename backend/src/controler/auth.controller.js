const bcrypt = require("bcryptjs");
const userServ = require("../service/user.service");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

class AuthController {
  register = async (req, res, next) => {
    try {
      let registerData = req.body;
      if (req.file) {
        registerData.image = req.file.filename;
      }

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
        let accessToken = jwt.sign(
          {
            userId: userDetail._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "3h" }
        );

        let refreshToken = jwt.sign(
          {
            userId: userDetail._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "5d" }
        );
        res.json({
          //  result:payload
          result: {
            data: userDetail,
            token: {
              accessToken: accessToken,
              accessType: "Bearer",
              refreshToken: refreshToken,
            },
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

  getLoggedInUser = (req, res, next) => {
    try {
      res.json({
        result: req.authUser,
        msg: "Your detail",
        status: true,
      });
    } catch (exception) {
      console.log(exception);
      next(exception);
    }
  };

  getAllUser = async (req, res, next) => {
    try {
      let paging = {
        totalNoOfRows: await userServ.getAllCount(),
        perPage: req.query.perPage ? Number(req.query.perPage) : 10,
        currentPage: req.query.page ? Number(req.query.page) : 1,
      };
      let data = await userServ.getAllUsers(paging);
      res.json({
        result: data,
        status: true,
        msg: "Users Data Fetched",
        meta: paging,
      });
    } catch (exception) {
      console.log(exception);
      next(exception);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      let user = await userServ.getUserById(req.params.id);

      res.json({
        result: user,
        msg: "User fetched successfully",
        status: true,
        meta: null,
      });
    } catch (except) {
      next(except);
    }
  };


  getUserBySlug = async (req, res, next) => {
    try {
      let user = await userServ.getUserByFilter(
        {
          slug: req.params.slug,
        },
        {
          perPage: 1,
          currentPage: 1,
        }
      );

      res.json({
        result: movie[0],
        msg: "User fetched successfully",
        status: true,
        meta: null,
      });
    } catch (except) {
      next(except);
    }
  };
}

const authCtrl = new AuthController();
module.exports = authCtrl;
