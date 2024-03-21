import axiosInstance from "../config/axios.config";
import HttpService from "./http.service";

class ChatService extends HttpService {

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
      let response = await this.getRequest("/auth/all", { auth: true });
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  getUserById = async (id) => {
    try {
      let response = await this.getRequest("/auth/" + id, { auth: true });
      return response;
    } catch (exception) {
      throw exception;
    }
  };
}

export default ChatService;
