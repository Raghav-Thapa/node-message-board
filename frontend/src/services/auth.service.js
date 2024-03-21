import axiosInstance from "../config/axios.config";
import HttpService from "./http.service";

class AuthService extends HttpService {
  login = async (credentials) => {
    try {
      let response = await axiosInstance.post("/auth/login", credentials);
      return response;
    } catch (error) {
      throw error;
    }
  };

  register = async (data) => {
    try {
      let response = await axiosInstance.post("/auth/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  getUserByToken = async (token) => {
    try {
      let response = await axiosInstance.post(
        "/auth/activate/" + token,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  getLoggedInUser = async () => {
    try {
      let token = localStorage.getItem("accessToken");
      if (!token) {
        throw "Token not set...";
      }
      let userInfo = await axiosInstance.get("/auth/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
      });
      return userInfo;
    } catch (exception) {}
  };

  listAllUsers = async () => {
    try {
      let response = await this.getRequest(
        "/auth/all",
        { auth: true }
      );
      return response;
    } catch (exception) {
      throw exception;
    }
  };
}

export default AuthService;
