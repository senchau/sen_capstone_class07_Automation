// import { Locator, Page } from "@playwright/test";
// import { BasePage } from "../common/BasePage";
// import { Locale } from '../types'
// import { LANGUAGE } from '../constants'

// export class TopBarNavigationPage extends BasePage {
//     goToSignInPage() {
//       throw new Error('Method not implemented.');
//     }

//     readonly lnkLogin = this.page.locator("//h3[text()='Đăng Nhập']");
//     readonly lnkRegister = this.page.locator("//a[@href='/sign-up']");
//     readonly menuItem = "//div[@text='%s']"; //xpath string dynamic
//     readonly userProfile = "Avatar %s";

//     private readonly lang: Record<string, string>;
//     readonly registerBtnLocator!: Locator


//     constructor(page: Page, locale: Locale) {
//         super(page);

//         this.lang = LANGUAGE[locale]
//         this.registerBtnLocator = this.page.locator('//a[@href="/sign-up"]');
//     }

//     async openRegisterFormModal(): Promise<void> {
//         try {
//             await this.registerBtnLocator.click()


//         } catch (e) {

//         }
//     }

//     getUserProfileLocator(userName: string): Locator {
//         let expectedUserProfile = this.userProfile.replace('%s', userName);
//         return this.page.getByRole('link', { name: `${expectedUserProfile}` })
//     }

//     async navigateLoginPage() {
//         await this.click(this.lnkLogin);
//     }

//     async navigateRegisterPage() {
//         await this.click(this.lnkRegister);
//     }

//     async openMenuItem(item: string) {
//         // String menuItemXpath = String.format(menuItem, item); // Java
//         let menuItemXpath: string = this.menuItem.replace('%s', item); // String locator
//         // this.page.locator(menuItemXpath).click(); // Locator tuong ung voi WebElement
//         this.click(menuItemXpath); //goi click cua BasePage
//     }
// }
