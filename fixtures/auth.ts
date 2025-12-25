import { test as userFixtureTest } from "./user";
import { TLocale } from "../src/types/locale";
import { LANGUAGE } from "../src/constants/language";
import { UserModel } from "../src/models/User";
import { SignInPage } from "../pages/auth/SignInPage";
import { SignUpPage } from "../pages/auth/SignUpPage";

export const test = userFixtureTest.extend<{
  signIn: void;
  signUpRandomUser: UserModel;
}>({
  signIn: async ({ mockUser, page, context }, use) => {
    const locale: TLocale = "VI";
    await context.clearCookies();

    const signInPage = await SignInPage.go(page, { locale });

    const { data: signInData } = await signInPage.signIn({
      username: mockUser.username,
      password: mockUser.password,
    });
    expect(signInData?.isSuccess, "Đăng nhập không thành công").toEqual(true);

    await use();
  },

  signUpRandomUser: async ({ page, context }, use) => {
    const locale: TLocale = "VI";
    const LANG = LANGUAGE[locale];
    await context.clearCookies();

    const signUpPage = await SignUpPage.go(page, { locale });

    const { data: signUpRandomUserData } = await signUpPage.signUpRandomUser();

    const { data: signUpModalData } = await signUpPage.modal.getModalData();

    if (!signUpRandomUserData) {
      expect(
        signUpModalData?.title,
        "Đăng ký người dùng không thành công"
      ).toEqual(LANG.SIGN_UP_SUCCESSFULLY_MESSAGE);
      return;
    }

    use(signUpRandomUserData.user);
  },
});

export const expect = test.expect;
