import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/authen/LoginPage";
import { RegisterPage } from "../../pages/authen/RegisterPage";
import { SignUpPage } from "../../pages/myPage/SignUpPage";
import { SignInPage } from "../../pages/myPage/SignInPage";
import { TLocale } from "../../src/types/locale";
import { LANGUAGE } from "../../src/constants/language";

test("Hiển thị lỗi tài khoản và mật khẩu bắt buộc phải điền", async ({
  page,
  context,
}) => {
  const locale: TLocale = "VI";
  const LANG = LANGUAGE[locale];

  await context.clearCookies();

  const signInPage = await SignInPage.go(page, { locale });

  await signInPage.signIn("", "");

  const { data: accountErrorMessage } =
    await signInPage.getAccountErrorMessage();

  const { data: passwordErrorMessage } =
    await signInPage.getPasswordErrorMessage();

  for (const msg of [
    accountErrorMessage?.message,
    passwordErrorMessage?.message,
  ]) {
    expect(msg, "Lỗi trường bắt buộc không hiển thị").toEqual(
      LANG.SIGN_IN_MANDATORY_FIELD
    );
  }
});

test("Hiển thị lỗi mật khẩu không hợp lệ", async ({ page, context }) => {
  const locale: TLocale = "VI";
  const LANG = LANGUAGE[locale];

  await context.clearCookies();

  const signInPage = await SignInPage.go(page, { locale });

  await signInPage.signIn("user4", "Pass");

  const { data: passwordErrorMessage } =
    await signInPage.getPasswordErrorMessage();

  expect(
    passwordErrorMessage?.message,
    "Lỗi xác thực mật khẩu không hiển thị"
  ).toEqual(LANG.SIGN_IN_PASSWORD_GREATER_THAN_6_CHARACTERS);
});

test("Hiển thị lỗi khi đăng nhập với thông tin tài khoản sai", async ({
  page,
  context,
}) => {
  const locale: TLocale = "VI";
  const LANG = LANGUAGE[locale];

  await context.clearCookies();

  const signInPage = await SignInPage.go(page, { locale });

  await signInPage.signIn("user6", "Pass@123");

  const { data: errorAlertMessage } =
    await signInPage.getErrorAlertMessage();

  expect(
    errorAlertMessage?.message,
    "Thông báo lỗi sai thông tin đăng nhập không hiển thị"
  ).toEqual(LANG.SIGN_IN_ACCOUNT_ERROR);
});
