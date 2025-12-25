import { Locator, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { BasePage } from "../base/BasePage";
import { Modal } from "../components/Modal";
import { IBaseResp, IGoReq } from "../../src/interfaces/commons";
import {
  ISignUpRandomUserResp,
  ISignUpReq,
  ISignUpResp,
  IFieldValidationMessage,
} from "../../src/interfaces/auths";
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

  private readonly accountErrorMessageLocator!: Locator;
  private readonly passwordErrorMessageLocator!: Locator;
  private readonly confirmPasswordErrorMessageLocator!: Locator;
  private readonly fullnameErrorMessageLocator!: Locator;
  private readonly emailErrorMessageLocator!: Locator;
  private readonly errorAlertLocator!: Locator;

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
    this.errorAlertLocator = this.page.locator(
      "div[role='alert'] div.MuiAlert-message"
    );
  }

  public static async go(page: Page, input: IGoReq): Promise<SignUpPage> {
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

  async fillAccount(value: string): Promise<IBaseResp<void>> {
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

  async fillPassword(value: string): Promise<IBaseResp<void>> {
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

  async fillConfirmPassword(value: string): Promise<IBaseResp<void>> {
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

  async fillFullName(value: string): Promise<IBaseResp<void>> {
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

  async fillEmail(value: string): Promise<IBaseResp<void>> {
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

  async getAccountErrorMessage(): Promise<IBaseResp<IFieldValidationMessage>> {
    try {
      const textData = await this.getText(this.accountErrorMessageLocator);
      return {
        data: {
          message: textData.data || "",
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

  async getPasswordErrorMessage(): Promise<IBaseResp<IFieldValidationMessage>> {
    try {
      const textData = await this.getText(this.passwordErrorMessageLocator);
      return {
        data: {
          message: textData.data || "",
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

  async getConfirmPasswordErrorMessage(): Promise<
    IBaseResp<IFieldValidationMessage>
  > {
    try {
      const textData = await this.getText(
        this.confirmPasswordErrorMessageLocator
      );
      return {
        data: {
          message: textData.data || "",
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

  async getFullNameErrorMessage(): Promise<IBaseResp<IFieldValidationMessage>> {
    try {
      const textData = await this.getText(this.fullnameErrorMessageLocator);
      return {
        data: {
          message: textData.data || "",
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

  async getEmailErrorMessage(): Promise<IBaseResp<IFieldValidationMessage>> {
    try {
      const textData = await this.getText(this.emailErrorMessageLocator);
      return {
        data: {
          message: textData.data || "",
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

  async getErrorAlertMessage(): Promise<IBaseResp<IFieldValidationMessage>> {
    try {
      const textData = await this.getText(this.errorAlertLocator);
      return {
        data: {
          message: textData.data || "",
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

  async signUp({
    username,
    password,
    confirmPassword,
    fullName,
    email,
  }: ISignUpReq): Promise<IBaseResp<ISignUpResp>> {
    try {
      await this.fillAccount(username);
      await this.fillPassword(password);
      await this.fillConfirmPassword(confirmPassword);
      await this.fillFullName(fullName);
      await this.fillEmail(email);

      await this.click(this.registerBtnLocator);

      const { data: modalData } = await this.modal.getModalData();
      if (modalData?.title !== this.LANG.SIGN_UP_SUCCESSFULLY_MESSAGE) {
        throw new Error("Sign-up failed. Please try again");
      }

      return {
        data: {
          isSuccess: true,
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

  async signUpRandomUser(): Promise<IBaseResp<ISignUpRandomUserResp>> {
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

      const { data: signUpData, errorMessage = "" } = await this.signUp({
        username: userModel.username,
        password: userModel.password,
        confirmPassword: userModel.password,
        fullName: userModel.fullName,
        email: userModel.email,
      });
      if (!signUpData?.isSuccess) {
        throw new Error(errorMessage);
      }

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
