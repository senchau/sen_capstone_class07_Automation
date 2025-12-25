import { test, expect } from "../../fixtures/auth";
import { SignInPage } from "../../pages/myPage/SignInPage";
import { TLocale } from "../../src/types/locale";
import { LANGUAGE } from "../../src/constants/language";

test("Đăng nhập thành công với tài khoản vừa được đăng ký thành công", async ({
  page,
  signUpRandomUser,
}) => {
  const locale: TLocale = "VI";
  const LANG = LANGUAGE[locale];

  const signInPage = await SignInPage.go(page, { locale });

  await signInPage.signIn(signUpRandomUser.username, signUpRandomUser.password);

  const { data: signInModalContentData } = await signInPage.getModalContent();

  expect(
    signInModalContentData?.title,
    "Người dùng vừa đăng ký đăng nhập không thành công"
  ).toEqual(LANG.SIGN_IN_SUCCESSFULLY_MESSAGE);
});
