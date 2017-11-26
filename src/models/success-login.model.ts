import {User} from "./user.model";

export interface SuccessLogin {
  message: string;
  token: string;
  success: boolean;
  user: User;
}


