import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { test as userFixtureTest } from "../../fixtures/user";
import { SignUpPage } from "../../pages/auth/SignUpPage";
import { TLocale } from "../../src/types/locale";
import { LANGUAGE } from "../../src/constants/language";

test("Hiển thị lỗi các thông tin đăng ký bắt buộc phải điền", async ({
  page,
  context,
}) => {
  const locale: TLocale = "VI";
  const LANG = LANGUAGE[locale];

  await context.clearCookies();

  const signUpPage = await SignUpPage.go(page, { locale });

  await signUpPage.signUp({
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    email: "",
  });

  const { data: accountErrorMessage } =
    await signUpPage.getAccountErrorMessage();

  const { data: passwordErrorMessage } =
    await signUpPage.getPasswordErrorMessage();

  const { data: confirmPasswordErrorMessage } =
    await signUpPage.getConfirmPasswordErrorMessage();

  const { data: fullNameErrorMessage } =
    await signUpPage.getFullNameErrorMessage();

  const { data: emailErrorMessage } = await signUpPage.getEmailErrorMessage();

  for (const msg of [
    accountErrorMessage?.message,
    passwordErrorMessage?.message,
    confirmPasswordErrorMessage?.message,
    fullNameErrorMessage?.message,
    emailErrorMessage?.message,
  ]) {
    expect(msg, "Lỗi trường bắt buộc không hiển thị").toEqual(
      LANG.SIGN_UP_MANDATORY_FIELD
    );
  }
});

userFixtureTest(
  "Hiển thị lỗi mật khẩu và xác nhận mật khẩu không khớp",
  async ({ page, context, mockUser }) => {
    const locale: TLocale = "VI";
    const LANG = LANGUAGE[locale];

    await context.clearCookies();

    const signUpPage = await SignUpPage.go(page, { locale });

    await signUpPage.signUp({
      username: mockUser.username,
      password: mockUser.password,
      confirmPassword: mockUser.password + "xyz",
      fullName: mockUser.fullName,
      email: mockUser.email,
    });

    const { data: confirmPasswordErrorMessage } =
      await signUpPage.getConfirmPasswordErrorMessage();

    expect(
      confirmPasswordErrorMessage?.message,
      "Lỗi xác nhận mật khẩu không khớp không hiển thị"
    ).toEqual(LANG.SIGN_UP_PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCH);
  }
);

userFixtureTest(
  "Hiển thị lỗi họ tên không được chứa số hoặc ký tự đặc biệt",
  async ({ page, context, mockUser }) => {
    const locale: TLocale = "VI";
    const LANG = LANGUAGE[locale];

    await context.clearCookies();

    const signUpPage = await SignUpPage.go(page, { locale });

    await signUpPage.signUp({
      username: mockUser.username,
      password: mockUser.password,
      confirmPassword: mockUser.password,
      fullName: mockUser.fullName + "123",
      email: mockUser.email,
    });

    const { data: fullNameErrorMessage } =
      await signUpPage.getFullNameErrorMessage();

    expect(
      fullNameErrorMessage?.message,
      "Lỗi xác nhận mật khẩu không khớp không hiển thị"
    ).toEqual(LANG.SIGN_UP_NAME_MUST_NOT_INCLUDE_DIGIT);
  }
);

userFixtureTest(
  "Hiển thị lỗi mật khẩu phải dài hơn 6 ký tự",
  async ({ page, context, mockUser }) => {
    const locale: TLocale = "VI";
    const LANG = LANGUAGE[locale];

    await context.clearCookies();

    const signUpPage = await SignUpPage.go(page, { locale });

    await signUpPage.signUp({
      username: mockUser.username,
      password: "abcxy",
      confirmPassword: "abcxy",
      fullName: mockUser.fullName,
      email: mockUser.email,
    });

    const { data: passwordErrorMessage } =
      await signUpPage.getPasswordErrorMessage();

    expect(
      passwordErrorMessage?.message,
      "Lỗi mật khẩu không hợp lệ không hiển thị"
    ).toEqual(LANG.SIGN_UP_PASSWORD_GREATER_THAN_6_CHARACTERS);
  }
);

userFixtureTest(
  "Hiển thị lỗi tài khoản đã tồn tại",
  async ({ page, context, mockUser }) => {
    const locale: TLocale = "VI";
    const LANG = LANGUAGE[locale];

    await context.clearCookies();

    const signUpPage = await SignUpPage.go(page, { locale });

    await signUpPage.signUp({
      username: mockUser.username,
      password: mockUser.password,
      confirmPassword: mockUser.password,
      fullName: mockUser.fullName,
      email: faker.internet.email(),
    });

    const { data: errorAlertMessage } = await signUpPage.getErrorAlertMessage();

    expect(
      errorAlertMessage?.message,
      "Lỗi tài khoản đã tồn tại không hiển thị"
    ).toEqual(LANG.SIGN_UP_USERNAME_ALREADY_EXISTS);
  }
);

userFixtureTest(
  "Hiển thị lỗi email đã tồn tại",
  async ({ page, context, mockUser }) => {
    const locale: TLocale = "VI";
    const LANG = LANGUAGE[locale];

    await context.clearCookies();

    const signUpPage = await SignUpPage.go(page, { locale });

    await signUpPage.signUp({
      username: faker.person.firstName(),
      password: mockUser.password,
      confirmPassword: mockUser.password,
      fullName: mockUser.fullName,
      email: mockUser.email,
    });

    const { data: errorAlertMessage } = await signUpPage.getErrorAlertMessage();

    expect(
      errorAlertMessage?.message,
      "Lỗi email đã tồn tại không hiển thị"
    ).toEqual(LANG.SIGN_UP_EMAIL_ALREADY_EXISTS);
  }
);
