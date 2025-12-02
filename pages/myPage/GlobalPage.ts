import { Locator, Page } from "@playwright/test";
import { IBaseOutput } from "../interfaces";

export interface IGetOptionsOptionsResp {
  locator: Locator;
  value: string;
  label: string;
}

export interface IGetOptionsResp {
  options: IGetOptionsOptionsResp[];
}

export interface IGetModalContentResp {
  title: string;
  content: string;
}

export class GlobalPage {
  protected readonly page: Page;

  private readonly modalLocator!: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalLocator = this.page.locator(
      '.swal2-popup.swal2-modal.swal2-show[role="dialog"]'
    );
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
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "GlobalPage.fill",
        errorMessage,
      });

      return {
        errorMessage,
        data: null,
      };
    }
  }

  async click(locator: Locator, timeout = 10000): Promise<IBaseOutput<void>> {
    try {
      await locator.waitFor({ state: "attached", timeout });
      await locator.click();

      return {
        data: null,
      };
    } catch (err) {
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "GlobalPage.click",
        errorMessage,
      });

      return {
        errorMessage,
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
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "GlobalPage.getOptions",
        errorMessage,
      });

      return {
        errorMessage,
        data: null,
      };
    }
  }

  async getModalContent(): Promise<IBaseOutput<IGetModalContentResp>> {
    try {
      await this.modalLocator.waitFor({ state: "visible" });

      const title = await this.modalLocator
        .locator("h2#swal2-title")
        .textContent();

      const content = await this.modalLocator
        .locator("div#swal2-content")
        .textContent();

      return {
        data: {
          title: title || "",
          content: content || "",
        },
      };
    } catch (err) {
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "GlobalPage.getModalContent",
        errorMessage,
      });

      return {
        errorMessage,
        data: null,
      };
    }
  }
}
