import { Locator, Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";
import { LANGUAGE } from "../constants";
import { TLocale } from "../types";


export class LoginPage extends BasePage {
    private readonly lang: Record<string, string>;
    readonly accountLocator!: Locator
    readonly passwordLocator!: Locator
    readonly loginBtnLocator!: Locator
    readonly loginTextLocator!: Locator

    readonly loginSuccessfullyMessageLocator!: Locator
    readonly accountLoginErrorMessageLocator!: Locator
    readonly passwordLoginErrorMessageLocator!: Locator
    readonly globalLoginErrorMesageLocator!: Locator


    constructor(page: Page, locale: TLocale) {
        super(page);

        this.lang = LANGUAGE[locale]
        this.accountLocator = this.page.locator('#taiKhoan');
        this.passwordLocator = this.page.locator('#matKhau');
        this.loginBtnLocator = this.page.locator(`//button[@type='submit'][normalize-space()='${this.lang.loginBtn}']`);
        this.loginTextLocator = this.page.locator(`//h1[text()='Đăng nhập']`);
        this.loginSuccessfullyMessageLocator = this.page.getByRole('heading', { name: 'Đăng nhập thành công' });
        this.accountLoginErrorMessageLocator = this.page.locator('#taiKhoan-helper-text');
        this.passwordLoginErrorMessageLocator = this.page.locator('#matKhau-helper-text');
        this.globalLoginErrorMesageLocator = this.page.locator("div[role='alert'] div.MuiAlert-message");



    }

    async waitLoginModal(timeout: number): Promise<boolean> {
        try {
            await this.loginTextLocator.waitFor({ state: 'visible', timeout });
            return true
        } catch (err) {
            console.log({
                context: 'LoginPage.waitloginModal',
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

    async submitloginBtn() {
        await this.click(this.loginBtnLocator);
    }
    async login(Account: string, Password: string) {
        await this.fillAccount(Account);
        await this.fillPassword(Password);
        await this.click(this.loginBtnLocator);
    }

    async getLoginSuccessfullyMessage(): Promise<string> {
        try {
            const msg = await this.getText(this.loginSuccessfullyMessageLocator)
            return !msg ? '' : msg
        } catch (err) {
            console.log({
                context: 'LoginPage.getLoginSuccessfullyMessage',
                errorMessage: (err as Error)?.message ?? ''
            })
            return ''
        }
    }

    async getAccountLoginErrorMessage(): Promise<string> {
        try {
            const msg = await this.getText(this.accountLoginErrorMessageLocator)
            return !msg ? '' : msg
        } catch (err) {
            console.log({
                context: 'LoginPage.getAccountLoginErrorMessage',
                errorMessage: (err as Error)?.message ?? ''
            })
            return ''
        }
    }

    async getPasswordLoginErrorMessage(): Promise<string> {
        try {
            const msg = await this.getText(this.passwordLoginErrorMessageLocator)
            return !msg ? '' : msg
        } catch (err) {
            console.log({
                context: 'LoginPage.getPasswrodLoginErrorMessage',
                errorMessage: (err as Error)?.message ?? ''
            })
            return ''
        }
    }

    async getglobalLoginErrorMessage(): Promise<string> {
        try {
            const msg = await this.getText(this.globalLoginErrorMesageLocator)
            return !msg ? '' : msg
        } catch (err) {
            console.log({
                context: 'LoginPage.getGlobalLoginErrorMessage',
                errorMessage: (err as Error)?.message ?? ''
            })
            return ''
        }
    }
}
