

import { Locator, Page } from '@playwright/test';

type PlaywrightLocator = string | Locator;

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  private getLocator(locator: PlaywrightLocator): Locator {
    return typeof locator === 'string' ? this.page.locator(locator) : locator;
  }

  async click(locator: PlaywrightLocator, timeout = 10000) {
    const element = this.getLocator(locator);
    await element.waitFor({ state: 'visible', timeout });
    await element.click();
  }

  async fill(locator: PlaywrightLocator, value: string, timeout = 10000) {
    const element = this.getLocator(locator);
    await element.waitFor({ state: 'visible', timeout });
    await element.fill(value);
  }

  async getText(locator: PlaywrightLocator, timeout = 10000): Promise<string | null> {
    const element = this.getLocator(locator);
    await element.waitFor({ state: 'visible', timeout });
    return await element.textContent();
  }
}