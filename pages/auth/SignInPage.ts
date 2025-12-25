import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { Modal } from "../components/Modal";
import { IBaseOutput, IGoInput } from "../../src/interfaces/commons";
import {
  ISignInResp,
  IFieldValidationMessage,
} from "../../src/interfaces/auths";
import { TLocale } from "../../src/types/locale";
import { SIGN_IN_PAGE_DOMAIN } from "../../src/constants/endpoint";
import { formatError, prettyErrorLog, normalizeUrl } from "../../helpers/utils";

export class SignInPage extends BasePage {
  private static instance: SignInPage;

  public readonly modal: Modal;

  private readonly accountLocator!: Locator;
  private readonly passwordLocator!: Locator;
  private readonly signInCtaBtnLocator!: Locator;
  private readonly accountErrorMessageLocator!: Locator;
  private readonly passwordErrorMessageLocator!: Locator;
  private readonly errorAlertLocator!: Locator;

  constructor(page: Page, locale: TLocale) {
    super(page, locale);

    this.modal = new Modal(page, locale);

    this.accountLocator = this.page.locator("#taiKhoan");
    this.passwordLocator = this.page.locator("#matKhau");
    this.signInCtaBtnLocator = this.page.locator(
      `//button[@type='submit'][normalize-space()='${this.LANG.SIGN_IN_CTA_BTN}']`
    );
    this.accountErrorMessageLocator = this.page.locator(
      "#taiKhoan-helper-text"
    );
    this.passwordErrorMessageLocator = this.page.locator(
      "#matKhau-helper-text"
    );
    this.errorAlertLocator = this.page.locator(
      "div[role='alert'] div.MuiAlert-message"
    );
  }

  public static async go(page: Page, input: IGoInput): Promise<SignInPage> {
    if (!SignInPage.instance) {
      SignInPage.instance = new SignInPage(page, input.locale);
    }

    const self = SignInPage.instance;

    try {
      const prevUrl = normalizeUrl(page.url());
      const curUrl = normalizeUrl(SIGN_IN_PAGE_DOMAIN);

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

  private async fillAccount(value: string): Promise<IBaseOutput<void>> {
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

  private async fillPassword(value: string): Promise<IBaseOutput<void>> {
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

  async signIn(
    username: string,
    password: string
  ): Promise<IBaseOutput<ISignInResp>> {
    try {
      await this.fillAccount(username);
      await this.fillPassword(password);

      await this.click(this.signInCtaBtnLocator);

      const { data: modalData } = await this.modal.getModalData();
      if (modalData?.title !== this.LANG.SIGN_IN_SUCCESSFULLY_MESSAGE) {
        throw new Error("Sign-in failed. Please try again");
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

  async getAccountErrorMessage(): Promise<
    IBaseOutput<IFieldValidationMessage>
  > {
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

  async getPasswordErrorMessage(): Promise<
    IBaseOutput<IFieldValidationMessage>
  > {
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

  async getErrorAlertMessage(): Promise<IBaseOutput<IFieldValidationMessage>> {
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
}
