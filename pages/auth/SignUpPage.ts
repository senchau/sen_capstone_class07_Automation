import { Locator, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { BasePage } from "../base/BasePage";
import { Modal } from "../components/Modal";
import { IBaseOutput, IGoInput } from "../../src/interfaces/commons";
import { ISignUpRandomUserResp } from "../../src/interfaces/auths";
import { TLocale } from "../../src/types/locale";
import { UserModel } from "../../src/models/User";
import { SIGN_UP_PAGE_DOMAIN } from "../../src/constants/endpoint";
import { formatError, prettyErrorLog, normalizeUrl } from "../../helpers/utils";

export class SignUpPage extends BasePage {
  private static instance: SignUpPage;

  public readonly modal: Modal;

  readonly accountLocator!: Locator;
  readonly passwordLocator!: Locator;
  readonly confirmPasswordLocator!: Locator;
  readonly fullnameLocator!: Locator;
  readonly emailLocator!: Locator;
  readonly registerBtnLocator!: Locator;
  readonly registerTextLocator!: Locator;

  readonly accountErrorMessageLocator!: Locator;
  readonly passwordErrorMessageLocator!: Locator;
  readonly confirmPasswordErrorMessageLocator!: Locator;
  readonly fullnameErrorMessageLocator!: Locator;
  readonly emailErrorMessageLocator!: Locator;
  readonly globalErrorMessageLocator!: Locator;
  readonly registerSuccessfullyMessageLocator!: Locator;

  constructor(page: Page, locale: TLocale) {
    super(page, locale);

    this.modal = new Modal(page, locale);

    this.accountLocator = this.page.locator("#taiKhoan");
    this.passwordLocator = this.page.locator("#matKhau");
    this.confirmPasswordLocator = this.page.locator("#confirmPassWord");
    this.fullnameLocator = this.page.locator("#hoTen");
    this.emailLocator = this.page.locator("#email");
    this.registerBtnLocator = this.page.locator(
      `//button[@type='submit' and contains(normalize-space(.), '${this.LANG.SIGN_UP_CTA_BTN}')]`
    );
    this.registerTextLocator = this.page.locator('//h1[text()="Đăng ký"]');
    this.registerSuccessfullyMessageLocator = this.page.getByRole("heading", {
      name: "Đăng ký thành công",
    });

    this.accountErrorMessageLocator = this.page.locator(
      "#taiKhoan-helper-text"
    );
    this.passwordErrorMessageLocator = this.page.locator(
      "#matKhau-helper-text"
    );
    this.confirmPasswordErrorMessageLocator = this.page.locator(
      "#confirmPassWord-helper-text"
    );
    this.fullnameErrorMessageLocator = this.page.locator("#hoTen-helper-text");
    this.emailErrorMessageLocator = this.page.locator("#email-helper-text");
    this.globalErrorMessageLocator = this.page.locator(
      "div[role='alert'] div.MuiAlert-message"
    );
  }

  public static async go(page: Page, input: IGoInput): Promise<SignUpPage> {
    if (!SignUpPage.instance) {
      SignUpPage.instance = new SignUpPage(page, input.locale);
    }

    const self = SignUpPage.instance;

    try {
      const prevUrl = normalizeUrl(page.url());
      const curUrl = normalizeUrl(SIGN_UP_PAGE_DOMAIN);

      if (prevUrl !== curUrl) {
        await self.page.goto(curUrl);
      }

      return self;
    } catch (err) {
      const error = formatError(err);
      prettyErrorLog(error);

      return self;
    }
  }

  async fillAccount(value: string): Promise<IBaseOutput<void>> {
    try {
      return await this.fill(this.accountLocator, value);
    } catch (err) {
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
        data: null,
      };
    }
  }

  async fillPassword(value: string): Promise<IBaseOutput<void>> {
    try {
      return await this.fill(this.passwordLocator, value);
    } catch (err) {
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
        data: null,
      };
    }
  }

  async fillConfirmPassword(value: string): Promise<IBaseOutput<void>> {
    try {
      return await this.fill(this.confirmPasswordLocator, value);
    } catch (err) {
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
        data: null,
      };
    }
  }

  async fillFullname(value: string): Promise<IBaseOutput<void>> {
    try {
      return await this.fill(this.fullnameLocator, value);
    } catch (err) {
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
        data: null,
      };
    }
  }

  async fillEmail(value: string): Promise<IBaseOutput<void>> {
    try {
      return await this.fill(this.emailLocator, value);
    } catch (err) {
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
        data: null,
      };
    }
  }

  async signUpRandomUser(): Promise<IBaseOutput<ISignUpRandomUserResp>> {
    try {
      const firstName = faker.person.firstName();

      const userModel = new UserModel({
        username: firstName
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\W+/g, ""),
        password: faker.internet.password(),
        email: faker.internet.email(),
        firstName,
        lastName: faker.person.lastName(),
        userType: "Customer",
      });

      await this.fillAccount(userModel.username);
      await this.fillPassword(userModel.password);
      await this.fillConfirmPassword(userModel.password);
      await this.fillFullname(userModel.fullName);
      await this.fillEmail(userModel.email);

      await this.click(this.registerBtnLocator);

      return {
        data: {
          user: userModel,
        },
      };
    } catch (err) {
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
        data: null,
      };
    }
  }
}
