import { Locator, Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";
import { Locale } from '../types'
import { LANGUAGE } from '../constants'

export class TopBarNavigationPage extends BasePage {

    readonly lnkLogin = this.page.locator("//h3[text()='Đăng Nhập']");
    readonly lnkRegister = this.page.locator("//a[@href='/sign-up']");
    readonly menuItem = "//div[@text='%s']"; //xpath string dynamic
    readonly userProfile = "Avatar %s";

    private readonly lang: Record<string, string>;
    readonly signInBtnLocator!: Locator
    readonly signUpBtnLocator!: Locator
    readonly logoutBtnLocator!: Locator
    readonly userProfileLocator!: Locator
    readonly signInUrl = "sign-in"
    readonly signUpUrl = "sign-up"
    readonly accountUrl = "account"



    constructor(page: Page, locale: Locale) {
        super(page);

        this.lang = LANGUAGE[locale]
        this.signInBtnLocator = this.page.locator(`//a[@href="/${this.signInUrl}"]`);
        this.signUpBtnLocator = this.page.locator(`//a[@href="/${this.signUpUrl}"]`);
        this.userProfileLocator = this.page.locator("//a[@href='/account']");
        this.logoutBtnLocator = this.page.locator("//h3[contains(text(), 'Đăng xuất')]");
    }

    async goToSignInPage(): Promise<boolean> {
        try {
            await this.signInBtnLocator.click()
            await this.page.waitForURL(`**/${this.signInUrl}`)

            return true
        } catch (err) {
            console.log({
                context: 'TopBarNavigationPage.goToSignInPage',
                errorMessage: (err as Error).message
            })
            return false
        }
    }

    async goToSignUpPage(): Promise<boolean> {
        try {
            await this.signUpBtnLocator.click()
            await this.page.waitForURL(`**/${this.signUpUrl}`)

            return true
        } catch (err) {
            console.log({
                context: 'TopBarNavigationPage.goToSignUpPage',
                errorMessage: (err as Error).message
            })
            return false
        }
    }

    async openLogoutConfirmPopup(): Promise<void> {
        await this.logoutBtnLocator.click();
    }

    // getUserProfileLocator(userName: string): Locator {
    //     let expectedUserProfile = this.userProfile.replace('%s', userName);
    //     return this.page.getByRole('link', { name: `${expectedUserProfile}` })
    // }

    async goToAccountPage(): Promise<boolean> {
    try {
        await this.userProfileLocator.click();
        await this.page.waitForURL(`**/${this.accountUrl}`);

        return true;
    } catch (err) {
        console.log({
            context: 'TopBarNavigationPage.goToAccountPage',
            errorMessage: (err as Error).message
        });
        return false;
    }
}


    async navigateLoginPage() {
        await this.click(this.lnkLogin);
    }

    async navigateRegisterPage() {
        await this.click(this.lnkRegister);
    }

    async openMenuItem(item: string) {
        // String menuItemXpath = String.format(menuItem, item); // Java
        let menuItemXpath: string = this.menuItem.replace('%s', item); // String locator
        // this.page.locator(menuItemXpath).click(); // Locator tuong ung voi WebElement
        this.click(menuItemXpath); //goi click cua BasePage
    }
}