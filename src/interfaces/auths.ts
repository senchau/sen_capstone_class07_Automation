import { UserModel } from "../models/User";

export interface ISignUpRandomUserResp {
  user: UserModel;
}

export interface ISignInReq {
  username: string;
  password: string;
}

export interface ISignInResp {
  isSuccess: boolean;
}

export interface ISignUpReq {
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  email: string;
}

export interface ISignUpResp {
  isSuccess: boolean;
}

export interface IFieldValidationMessage {
  message: string;
}
