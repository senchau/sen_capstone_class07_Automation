import { test as base } from "@playwright/test";
import userMockData from "../data/user.json";
import { UserModel } from "../src/models/User";
import { TUserType } from "../src/types/user";

export { expect } from "@playwright/test";

export const test = base.extend<{
  mockUser: UserModel;
}>({
  mockUser: async ({}, use) => {
    const userTest = new UserModel({
      username: userMockData.username,
      password: userMockData.password,
      email: userMockData.email,
      userType: userMockData.userType as TUserType,
      firstName: userMockData.firstName,
      lastName: userMockData.lastName,
    });

    await use(userTest);
  },
});
