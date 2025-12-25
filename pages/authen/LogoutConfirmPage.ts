import { Page, Locator } from "@playwright/test";
import { BasePage } from "../common/BasePage";
import { LANGUAGE } from "../constants";
import { TLocale } from '../types'

export class LogoutConfirmPage extends BasePage {

    private readonly lang: Record<string, string>;
    readonly popupTitleLocator: Locator
    readonly confirmBtnLocator: Locator
    readonly cancelBtnLocator: Locator
    readonly logoutSuccessfullyMessageLocator!: Locator

    constructor(page: Page, locale: TLocale) {
        super(page);

        this.lang = LANGUAGE[locale];
        this.popupTitleLocator = this.page.locator("//h2[contains(text(),'Bạn có muốn đăng xuất ?')]");
        this.confirmBtnLocator = this.page.locator("//button[normalize-space()='Đồng ý']");
        this.cancelBtnLocator = this.page.locator("//button[normalize-space()='Hủy']");
        this.logoutSuccessfullyMessageLocator = this.page.getByRole('heading', { name: 'Đã đăng xuất' });
    }

    async getLogoutTitlePopup(): Promise<string> {
        try {
            const msg = await this.getText(this.popupTitleLocator)
            return !msg ? '' : msg
        } catch (err) {
            console.log({
                context: 'LogoutConfirmPage.getLogoutTitlePopup',
                errorMessage: (err as Error)?.message ?? ''
            })
            return ''
        }
    }

    async confirmLogout(): Promise<void> {
        await this.confirmBtnLocator.click();
    }

    async cancelLogout(): Promise<void> {
        await this.cancelBtnLocator.click();
    }

    async getLogoutSuccessfullyMessage(): Promise<string> {
        try {
            const msg = await this.getText(this.logoutSuccessfullyMessageLocator)
            return !msg ? '' : msg
        } catch (err) {
            console.log({
                context: 'LogoutConfirmPage.getLogoutSuccessfullyMessage',
                errorMessage: (err as Error)?.message ?? ''
            })
            return ''
        }
    }
}
