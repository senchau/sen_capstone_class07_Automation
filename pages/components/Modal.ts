import { Page, Locator } from "@playwright/test";
import { TLocale } from "../../src/types/locale";
import { LANGUAGE } from "../../src/constants/language";
import { IBaseResp, IGetModalDataResp } from "../../src/interfaces/commons";
import { formatError, prettyErrorLog } from "../../helpers/utils";

export class Modal {
  private readonly page: Page;
  private readonly LANG: Record<string, string>;

  private readonly modalLocator!: Locator;

  constructor(page: Page, locale: TLocale) {
    this.page = page;
    this.LANG = LANGUAGE[locale];

    this.modalLocator = this.page.locator(
      '.swal2-popup.swal2-modal.swal2-show[role="dialog"]'
    );
  }

  async getModalData(): Promise<IBaseResp<IGetModalDataResp>> {
    try {
      await this.modalLocator.waitFor({ state: "visible" });

      const title = await this.modalLocator
        .locator("h2#swal2-title")
        .textContent();

      const content = await this.modalLocator
        .locator("div#swal2-content")
        .textContent();

      const allBtnLocators = await this.modalLocator
        .locator("//button[contains(@style, 'display: inline-block')]")
        .all();

      let okBtnLocator = null;
      if (allBtnLocators.length > 0) {
        okBtnLocator = allBtnLocators[0];
      }

      let cancelBtnLocator = null;
      if (allBtnLocators.length > 1) {
        cancelBtnLocator = allBtnLocators[1];
      }

      const ok = async () => {
        if (
          okBtnLocator &&
          (await okBtnLocator.isVisible()) &&
          (await okBtnLocator.isEnabled())
        ) {
          await okBtnLocator.click();
        }
      };

      const cancel = async () => {
        if (
          cancelBtnLocator &&
          (await cancelBtnLocator.isVisible()) &&
          (await cancelBtnLocator.isEnabled())
        ) {
          await cancelBtnLocator.click();
        }
      };

      return {
        data: {
          title: title || "",
          content: content || "",
          ok,
          cancel,
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
