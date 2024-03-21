import AuthService from "./auth.service";
const authSvc = new AuthService();

import MessageService from "./message.service";
const msgSvc = new MessageService();

export const Auth = {
  authSvc,
  msgSvc,
};
