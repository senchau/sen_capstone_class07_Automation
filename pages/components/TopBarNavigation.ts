import { Locator, Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";
import { Locale } from '../types'
import { LANGUAGE } from '../constants'

export class TopBarNavigationPage extends BasePage {

    readonly lnkLogin = this.page.locator("//h3[text()='Đăng Nhập']");
    readonly lnkRegister = this.page.locator("//a[@href='/sign-up']");
    readonly menuItem = "//h4[normalize-space(text())='%s']"; //xpath string dynamic
    readonly userProfile = "Avatar %s";

    private readonly lang: Record<string, string>;
    readonly registerBtnLocator!: Locator


    constructor(page: Page, locale: Locale) {
        super(page);

        this.lang = LANGUAGE[locale]
        this.registerBtnLocator = this.page.locator('//a[@href="/sign-up"]');
    }

    async openRegisterFormModal(): Promise<void> {
        try {
            await this.registerBtnLocator.click()


        } catch (e) {

        }
    }

    getUserProfileLocator(userName: string): Locator {
        let expectedUserProfile = this.userProfile.replace('%s', userName);
        return this.page.getByRole('link', { name: `${expectedUserProfile}` })
    }

    async navigateLoginPage() {
        await this.click(this.lnkLogin);
    }

    async navigateRegisterPage() {
        await this.click(this.lnkRegister);
    }

    async openMenuItem(item: string) {
        // const menuItemXpath = this.menuItem.replace('%s', item);
        const element = this.page.locator('//*[@id="root"]/div/div[1]/header/div/div/div[2]/a[2]');
        await this.page.waitForTimeout(5000)
        await element.click();
    }
   
}

