import { Locator, Page } from "@playwright/test";
import { GlobalPage } from "./GlobalPage";
import { IBaseOutput, IGoInput } from "../../src/interfaces/commons";
import { TLocale } from "../../src/types/locale";
import { LANGUAGE } from "../../src/constants/language";
import { SIGN_IN_PAGE_DOMAIN } from "../../src/constants/endpoint";
import { normalizeUrl } from "../../helpers/utils";

export interface ISignInResp {
  isSuccess: boolean;
}

export class SignInPage extends GlobalPage {
  private static instance: SignInPage;
  private readonly LANG: Record<string, string>;

  private readonly accountLocator!: Locator;
  private readonly passwordLocator!: Locator;
  private readonly signInCtaBtnLocator!: Locator;
  private readonly loginTextLocator!: Locator;

  private readonly loginSuccessfullyMessageLocator!: Locator;
  private readonly accountLoginErrorMessageLocator!: Locator;
  private readonly passwordLoginErrorMessageLocator!: Locator;
  private readonly globalLoginErrorMesageLocator!: Locator;

  constructor(page: Page, locale: TLocale) {
    super(page);

    this.LANG = LANGUAGE[locale];
    this.accountLocator = this.page.locator("#taiKhoan");
    this.passwordLocator = this.page.locator("#matKhau");
    this.signInCtaBtnLocator = this.page.locator(
      `//button[@type='submit'][normalize-space()='${this.LANG.SIGN_IN_CTA_BTN}']`
    );
    this.loginTextLocator = this.page.locator(`//h1[text()='Đăng nhập']`);
    this.loginSuccessfullyMessageLocator = this.page.getByRole("heading", {
      name: "Đăng nhập thành công",
    });
    this.accountLoginErrorMessageLocator = this.page.locator(
      "#taiKhoan-helper-text"
    );
    this.passwordLoginErrorMessageLocator = this.page.locator(
      "#matKhau-helper-text"
    );
    this.globalLoginErrorMesageLocator = this.page.locator(
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

  // async getLoginSuccessfullyMessage(): Promise<string> {
  //   try {
  //     const msg = await this.getText(this.loginSuccessfullyMessageLocator);
  //     return !msg ? "" : msg;
  //   } catch (err) {
  //     console.log({
  //       context: "SignInPage.getLoginSuccessfullyMessage",
  //       errorMessage: (err as Error)?.message ?? "",
  //     });
  //     return "";
  //   }
  // }

  // async getAccountLoginErrorMessage(): Promise<string> {
  //   try {
  //     const msg = await this.getText(this.accountLoginErrorMessageLocator);
  //     return !msg ? "" : msg;
  //   } catch (err) {
  //     console.log({
  //       context: "SignInPage.getAccountLoginErrorMessage",
  //       errorMessage: (err as Error)?.message ?? "",
  //     });
  //     return "";
  //   }
  // }

  // async getPasswordLoginErrorMessage(): Promise<string> {
  //   try {
  //     const msg = await this.getText(this.passwordLoginErrorMessageLocator);
  //     return !msg ? "" : msg;
  //   } catch (err) {
  //     console.log({
  //       context: "SignInPage.getPasswrodLoginErrorMessage",
  //       errorMessage: (err as Error)?.message ?? "",
  //     });
  //     return "";
  //   }
  // }

  // async getglobalLoginErrorMessage(): Promise<string> {
  //   try {
  //     const msg = await this.getText(this.globalLoginErrorMesageLocator);
  //     return !msg ? "" : msg;
  //   } catch (err) {
  //     console.log({
  //       context: "SignInPage.getGlobalLoginErrorMessage",
  //       errorMessage: (err as Error)?.message ?? "",
  //     });
  //     return "";
  //   }
  // }
}
