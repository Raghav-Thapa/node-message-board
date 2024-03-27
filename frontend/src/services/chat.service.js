import HttpService from "./http.service";

class ChatService extends HttpService {
  getUserConversations = async () => {
    try {
      let response = await this.getRequest("/chat", { auth: true });
      return response;
    } catch (exception) {
      throw exception;
    }
  };
}
export default ChatService;
