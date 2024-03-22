import HttpService from "./http.service";
import axiosInstance from "../config/axios.config";

class ChatService extends HttpService {
  
  getUserConversations = async () => {
    try {
      let response = await this.getRequest("/chat", { auth: true });
      return response;
    } catch (exception) {
      throw exception;
    }
  };
  createChat = async (data) => {
    try {
      let response = await this.postRequest("/chat", data, {
        auth: true,
      });
      return response;
    } catch (exception) {
      throw exception;
    }
  };
  getChatById = async () => {
    try {
      let response = await this.getRequest("/chat", { auth: true });
      return response;
    } catch (exception) {
      throw exception;
    }
  };
  fetchChatHistory = async (user1Id, user2Id) => {
    try {
      let response = await axiosInstance.get(
        `/chat/history/${user1Id}/${user2Id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  sendMessage = async (fromUserId, toUserId, message) => {
    try {
      let response = await axiosInstance.post(`/chat/send`, {
        fromUserId,
        toUserId,
        message,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
}
export default ChatService;
