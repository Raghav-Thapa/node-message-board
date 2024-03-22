import AuthService from "./auth.service";
const authSvc = new AuthService();

import MessageService from "./message.service";
const msgSvc = new MessageService();

import ChatService from "./chat.service";
const chatSvc = new ChatService()

export const Auth = {
  authSvc,
  msgSvc,
  chatSvc,
};
