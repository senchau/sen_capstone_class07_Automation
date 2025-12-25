import { Page, Locator } from "@playwright/test";
import { TLocale } from "../../src/types/locale";
import { IBaseResp } from "../../src/interfaces/commons";
import { IAccountResp } from "../../src/interfaces/headers";
import { LANGUAGE } from "../../src/constants/language";
import { formatError, prettyErrorLog } from "../../helpers/utils";

export class Header {
  private readonly page: Page;
  private readonly LANG: Record<string, string>;

  private readonly headerLocator!: Locator;
  private readonly signOutCtaBtnLocator!: Locator;
  private readonly accountLocator!: Locator;

  constructor(page: Page, locale: TLocale) {
    this.page = page;
    this.LANG = LANGUAGE[locale];

    this.headerLocator = this.page.locator("//header");
    this.signOutCtaBtnLocator = this.headerLocator.locator(
      `//h3[normalize-space() = "${this.LANG.HEADER_SIGN_OUT_CTA_BTN}"]`
    );
    this.accountLocator = this.headerLocator.locator(
      `//div[img[contains(@alt, 'Avatar')]]/following-sibling::h3`
    );
  }

  public async clickSignOut() {
    try {
      await this.signOutCtaBtnLocator.waitFor({ state: "attached" });
      await this.signOutCtaBtnLocator.click();
    } catch (err) {
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
        data: null,
      };
    }
  }

  public async getAccountInfo(): Promise<IBaseResp<IAccountResp>> {
    try {
      await this.accountLocator.waitFor({ state: "visible" });
      const text = await this.accountLocator.textContent();

      return {
        data: {
          fullName: text || "",
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
