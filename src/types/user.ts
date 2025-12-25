export type TUserType = "Customer";

export type TUser = {
  username: string;
  password: string;
  email: string;
  userType: TUserType;
  firstName: string;
  lastName: string;
};
