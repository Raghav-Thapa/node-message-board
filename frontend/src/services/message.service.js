import HttpService from "./http.service";

class MessageService extends HttpService {
    
  getMessageByChat = async (chatId) => {
    try {
      let response = await this.getRequest("/message/" + chatId);
      return response;
    } catch (exception) {
      throw exception;
    }
  };
}
export default MessageService;
