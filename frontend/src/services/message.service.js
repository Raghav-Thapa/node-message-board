import HttpService from "./http.service";

class MessageService extends HttpService {
  getMessages = async (id) => {
    try {
      let response = await this.getRequest(`/message/${id}`, { auth: true });
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  sendMessage = async (requestBody) => {
    try {
      if (
        !Array.isArray(requestBody.participants) ||
        !requestBody.participants.every(
          (participant) => typeof participant === "string"
        )
      ) {
        console.error("Invalid ");
        return;
      }
      const receiverId = requestBody.participants[1];

      let response = await this.postRequest(
        `/message/send/${receiverId}`,
        requestBody,
        {
          auth: true,
        }
      );
      return response;
    } catch (exception) {
      throw exception;
    }
  };
}
export default MessageService;
