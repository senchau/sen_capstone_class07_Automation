import { UserModel } from "../models/User";

export interface ISignUpRandomUserResp {
  user: UserModel;
}

export interface ISignInResp {
  isSuccess: boolean;
}

export interface IFieldValidationMessage {
  message: string;
}
