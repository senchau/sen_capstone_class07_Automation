import { Locator, Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";

export class TopBarNavigation extends BasePage {

    readonly lnkLogin = this.page.locator("//h3[text()='Đăng Nhập']");
    readonly lnkRegister = this.page.locator("//a[@href='/sign-up']");
    readonly menuItem = "//h4[normalize-space(text())='%s']"; //xpath string dynamic
    readonly userProfile = "Avatar %s";

    constructor(page: Page) {
        super(page);
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

    // async openMenuItem(item: string) {
    //     // String menuItemXpath = String.format(menuItem, item); // Java
    //     let menuItemXpath: string = this.menuItem.replace('%s', item); // String locator
    //     // this.page.locator(menuItemXpath).click(); // Locator tuong ung voi WebElement
    //     this.click(menuItemXpath); //goi click cua BasePage
    async openMenuItem(item: string) {
        // const menuItemXpath = this.menuItem.replace('%s', item);
        const element = this.page.locator('//*[@id="root"]/div/div[1]/header/div/div/div[2]/a[2]');
        await this.page.waitForTimeout(5000)
        // await element.waitFor({ state: 'visible', timeout: 20000 }); // đảm bảo element hiển thi
        await element.click();
    }
    // await this.click(this.page.locator(menuItemXpath));
}

