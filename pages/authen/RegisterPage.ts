import { Locator, Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";
import { Locale } from '../types'
import { LANGUAGE } from '../constants'
import { faker } from '@faker-js/faker';
import { UserModel } from '../../models/User'

export class RegisterPage extends BasePage {
  private readonly lang: Record<string, string>;
  readonly accountLocator!: Locator
  readonly passwordLocator!: Locator
  readonly confirmPasswordLocator!: Locator
  readonly fullnameLocator!: Locator
  readonly emailLocator!: Locator
  readonly registerBtnLocator!: Locator
  readonly registerTextLocator!: Locator

  readonly accountErrorMessageLocator!: Locator
  readonly passwordErrorMessageLocator!: Locator
  readonly confirmPasswordErrorMessageLocator!: Locator
  readonly fullnameErrorMessageLocator!: Locator
  readonly emailErrorMessageLocator!: Locator
  readonly globalErrorMessageLocator !: Locator
  readonly registerSuccessfullyMessageLocator!: Locator


  constructor(page: Page, locale: Locale) {
    super(page);

    this.lang = LANGUAGE[locale]

    this.accountLocator = this.page.locator('#taiKhoan');
    this.passwordLocator = this.page.locator('#matKhau');
    this.confirmPasswordLocator = this.page.locator('#confirmPassWord');
    this.fullnameLocator = this.page.locator('#hoTen');
    this.emailLocator = this.page.locator('#email');
    this.registerBtnLocator = this.page.locator(`//button[@type='submit' and contains(normalize-space(.), '${this.lang.registerBtn}')]`);
    this.registerTextLocator = this.page.locator('//h1[text()="Đăng ký"]');
    this.registerSuccessfullyMessageLocator = this.page.getByRole('heading', { name: 'Đăng ký thành công' });

    this.accountErrorMessageLocator = this.page.locator('#taiKhoan-helper-text');
    this.passwordErrorMessageLocator = this.page.locator('#matKhau-helper-text');
    this.confirmPasswordErrorMessageLocator = this.page.locator('#confirmPassWord-helper-text');
    this.fullnameErrorMessageLocator = this.page.locator('#hoTen-helper-text');
    this.emailErrorMessageLocator = this.page.locator('#email-helper-text');
    this.globalErrorMessageLocator = this.page.locator("div[role='alert'] div.MuiAlert-message")

  }

  async registerRandomUser(): Promise<UserModel> {
    const firstName = faker.person.firstName();

    const userModel = new UserModel(
      firstName.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\W+/g, ""),
      faker.internet.password(),
      faker.internet.email(),
      firstName,
      faker.person.lastName()
    )

    // Click Đăng Ký để mở form (nếu cần)
    await this.waitRegisterModal(2000);

    // Điền thông tin đăng ký
    await this.fillAccount(userModel.account);
    await this.fillPassword(userModel.password);
    await this.fillConfirmPassword(userModel.password);
    await this.fillFullname(userModel.fullname);
    await this.fillEmail(userModel.email);

    // Submit form
    await this.submitRegisterBtn();

    return userModel
  }

  async waitRegisterModal(timeout: number): Promise<boolean> {
    try {
      await this.registerTextLocator.waitFor({ state: 'visible', timeout });
      return true
    } catch (err) {
      console.log({
        context: 'RegisterPage.waitRegisterModal',
        errorMessage: (err as Error)?.message ?? ''
      })
      return false
    }
  }

  async fillAccount(value: string): Promise<void> {
    await this.fill(this.accountLocator, value);
  }

  async fillPassword(value: string): Promise<void> {
    await this.fill(this.passwordLocator, value);
  }

  async fillConfirmPassword(value: string): Promise<void> {
    await this.fill(this.confirmPasswordLocator, value);
  }

  async fillFullname(value: string): Promise<void> {
    await this.fill(this.fullnameLocator, value);
  }

  async fillEmail(value: string): Promise<void> {
    await this.fill(this.emailLocator, value);
  }

  async getAccountErrorMessage(): Promise<string> {
    try {
      const msg = await this.getText(this.accountErrorMessageLocator)
      return !msg ? '' : msg
    } catch (err) {
      console.log({
        context: 'RegisterPage.getAccountErrorMessage',
        errorMessage: (err as Error)?.message ?? ''
      })
      return ''
    }
  }

  async getPasswordErrorMessage(): Promise<string> {
    try {
      const msg = await this.getText(this.passwordErrorMessageLocator)
      return !msg ? '' : msg
    } catch (err) {
      console.log({
        context: 'RegisterPage.getPasswordErrorMessage',
        errorMessage: (err as Error)?.message ?? ''
      })
      return ''
    }
  }

  async getConfirmPasswordErrorMessage(): Promise<string> {
    try {
      const msg = await this.getText(this.confirmPasswordErrorMessageLocator)
      return !msg ? '' : msg
    } catch (err) {
      console.log({
        context: 'RegisterPage.getConfirmPasswordErrorMessage',
        errorMessage: (err as Error)?.message ?? ''
      })
      return ''
    }
  }

  async getFullNameErrorMessage(): Promise<string> {
    try {
      const msg = await this.getText(this.fullnameErrorMessageLocator)
      return !msg ? '' : msg
    } catch (err) {
      console.log({
        context: 'RegisterPage.getFullNameErrorMessage',
        errorMessage: (err as Error)?.message ?? ''
      })
      return ''
    }
  }

  async getEmailErrorMessage(): Promise<string> {
    try {
      const msg = await this.getText(this.emailErrorMessageLocator)
      return !msg ? '' : msg
    } catch (err) {
      console.log({
        context: 'RegisterPage.getEmailErrorMessage',
        errorMessage: (err as Error)?.message ?? ''
      })
      return ''
    }
  }

  async getGlobalErrorMessage(): Promise<string> {
    try {
      const msg = await this.getText(this.globalErrorMessageLocator)
      return !msg ? '' : msg
    } catch (err) {
      console.log({
        context: 'RegisterPage.getGlobalErrorMessage',
        errorMessage: (err as Error)?.message ?? ''
      })
      return ''
    }
  }

  async submitRegisterBtn() {
    await this.click(this.registerBtnLocator);
  }

  async getregisterSuccessfullyMessage(): Promise<string> {
    try {
      const msg = await this.getText(this.registerSuccessfullyMessageLocator)
      return !msg ? '' : msg
    } catch (err) {
      console.log({
        context: 'RegisterPage.getregisterSuccessfullyMessage',
        errorMessage: (err as Error)?.message ?? ''
      })
      return ''
    }
  }
}


