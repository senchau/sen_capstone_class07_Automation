import { Locator, Page } from "@playwright/test";
import {
  IBaseOutput,
  IGetOptionsResp,
  IGetOptionsOptionsResp,
} from "../../src/interfaces/commons";
import { TLocale } from "../../src/types/locale";
import { LANGUAGE } from "../../src/constants/language";
import { formatError, prettyErrorLog } from "../../helpers/utils";

export class BasePage {
  protected readonly page: Page;
  protected readonly LANG: Record<string, string>;

  constructor(page: Page, locale: TLocale) {
    this.page = page;
    this.LANG = LANGUAGE[locale];
  }

  async fill(
    locator: Locator,
    value: string,
    timeout = 10000
  ): Promise<IBaseOutput<void>> {
    try {
      await locator.waitFor({ state: "attached", timeout });
      await locator.fill(value);

      return {
        data: null,
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

  async click(locator: Locator, timeout = 10000): Promise<IBaseOutput<void>> {
    try {
      await locator.waitFor({ state: "attached", timeout });

      if ((await locator.isVisible()) && (await locator.isEnabled())) {
        await locator.click();
      }

      return {
        data: null,
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

  async getText(
    locator: Locator,
    timeout = 10000
  ): Promise<IBaseOutput<string>> {
    try {
      await locator.waitFor({ state: "visible", timeout });
      const text = await locator.textContent();

      return {
        data: text,
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

  async getOptions(
    selectLocator: Locator
  ): Promise<IBaseOutput<IGetOptionsResp>> {
    try {
      await this.click(selectLocator);
      const optionLocator = await selectLocator.locator("//option");
      const optionLocators = await optionLocator.all();

      const optionItems: IGetOptionsOptionsResp[] = [];

      for (const optionLocator of optionLocators ?? []) {
        const value = await optionLocator.getAttribute("value");
        const label = await optionLocator.innerText();
        optionItems.push({
          locator: optionLocator,
          value: value || "",
          label,
        });
      }

      return {
        data: {
          options: optionItems,
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
