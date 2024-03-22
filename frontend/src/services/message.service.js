import HttpService from "./http.service";

class MessageService extends HttpService {
  // getMessageByChat = async (chatId) => {
  //   try {
  //     let response = await this.getRequest("/message/" + chatId);
  //     return response;
  //   } catch (exception) {
  //     throw exception;
  //   }
  // };

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
      // Ensure requestBody.participants is an array of strings
      if (
        !Array.isArray(requestBody.participants) ||
        !requestBody.participants.every(
          (participant) => typeof participant === "string"
        )
      ) {
        console.error("Invalid participants: expected an array of strings");
        return;
      }

      // Get the receiver's ID from the participants array
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
