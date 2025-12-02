type TUserType = "Customer";

type TUser = {
  username: string;
  password: string;
  email: string;
  userType: TUserType;
  firstName: string;
  lastName: string;
};

export class UserModel {
  public username: string;
  public password: string;
  public email: string;
  public userType: TUserType;
  public firstName: string;
  public lastName: string;

  constructor({
    username,
    password,
    email,
    userType,
    firstName,
    lastName,
  }: TUser) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.userType = userType;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
