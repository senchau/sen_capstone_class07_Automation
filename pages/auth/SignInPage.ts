import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { IBaseOutput, IGoInput } from "../../src/interfaces/commons";
import {
  ISignInResp,
  IFieldValidationMessage,
} from "../../src/interfaces/auths";
import { TLocale } from "../../src/types/locale";
import { LANGUAGE } from "../../src/constants/language";
import { SIGN_IN_PAGE_DOMAIN } from "../../src/constants/endpoint";
import { normalizeUrl } from "../../helpers/utils";

export class SignInPage extends BasePage {
  private static instance: SignInPage;
  private readonly LANG: Record<string, string>;

  private readonly accountLocator!: Locator;
  private readonly passwordLocator!: Locator;
  private readonly signInCtaBtnLocator!: Locator;
  private readonly accountErrorMessageLocator!: Locator;
  private readonly passwordErrorMessageLocator!: Locator;
  private readonly errorAlertLocator!: Locator;

  constructor(page: Page, locale: TLocale) {
    super(page);

    this.LANG = LANGUAGE[locale];

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
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "SignInPage.go",
        errorMessage,
      });

      return self;
    }
  }

  private async fillAccount(value: string): Promise<IBaseOutput<void>> {
    try {
      return await this.fill(this.accountLocator, value);
    } catch (err) {
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "SignInPage.fillAccount",
        errorMessage,
      });

      return {
        errorMessage,
        data: null,
      };
    }
  }

  private async fillPassword(value: string): Promise<IBaseOutput<void>> {
    try {
      return await this.fill(this.passwordLocator, value);
    } catch (err) {
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "SignInPage.fillPassword",
        errorMessage,
      });

      return {
        errorMessage,
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

      const content = await this.getModalContent();
      if (content.data?.title !== this.LANG.SIGN_IN_SUCCESSFULLY_MESSAGE) {
        throw new Error("Sign-in failed. Please try again");
      }

      return {
        data: {
          isSuccess: true,
        },
      };
    } catch (err) {
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "SignInPage.signIn",
        errorMessage: (err as Error)?.message ?? "",
      });

      return {
        errorMessage,
        data: {
          isSuccess: false,
        },
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
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "SignIngetAccountLoginErrorMessage",
        errorMessage: (err as Error)?.message ?? "",
      });

      return {
        errorMessage,
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
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "SignInPage.getPasswordErrorMessage",
        errorMessage: (err as Error)?.message ?? "",
      });

      return {
        errorMessage,
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
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "SignInPage.getErrorAlertMessage",
        errorMessage: (err as Error)?.message ?? "",
      });

      return {
        errorMessage,
        data: null,
      };
    }
  }
}
