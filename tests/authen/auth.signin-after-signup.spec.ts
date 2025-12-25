import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/authen/LoginPage";
import { RegisterPage } from "../../pages/authen/RegisterPage";
import { SignUpPage } from "../../pages/myPage/SignUpPage";
import { SignInPage } from "../../pages/myPage/SignInPage";
import { TLocale } from "../../src/types/locale";
import { LANGUAGE } from "../../src/constants/language";

test("Đăng nhập thành công với tài khoản vừa được đăng ký thành công", async ({
  page,
  context,
}) => {
  const locale: TLocale = "VI";
  const LANG = LANGUAGE[locale];

  await context.clearCookies();

  const signUpPage = await SignUpPage.go(page, { locale });

  const { data: randomUserData } = await signUpPage.signUpRandomUser();

  const { data: signUpModalContentData } = await signUpPage.getModalContent();

  if (!randomUserData) {
    expect(
      signUpModalContentData?.title,
      "Đăng ký người dùng không thành công"
    ).toEqual(LANG.SIGN_UP_SUCCESSFULLY_MESSAGE);

    return;
  }

  const signInPage = await SignInPage.go(page, { locale });

  await signInPage.signIn(
    randomUserData.user.username,
    randomUserData.user.password
  );

  const { data: signInModalContentData } = await signInPage.getModalContent();

  expect(
    signInModalContentData?.title,
    "Người dùng vừa đăng ký đăng nhập không thành công"
  ).toEqual(LANG.SIGN_IN_SUCCESSFULLY_MESSAGE);
});
