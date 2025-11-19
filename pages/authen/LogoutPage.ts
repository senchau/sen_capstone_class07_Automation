// import { Locator, Page } from "@playwright/test";
// import { BasePage } from "../common/BasePage";
// import{LANGUAGE} from "../constants";
// import {Locale } from "../types";

// export class LogoutPage extends BasePage {

//     private readonly lang: Record<string, string>;
//     readonly logoutBtnLocator!: Locator
//     readonly logoutConfirmMessageLocator!: Locator
//     readonly yesLogoutBtnLocator!: Locator
//     readonly cancelLogoutBtnLocator!: Locator
//     readonly logoutSuccessfullyMessage!: Locator



// constructor(page: Page, locale: Locale) {
//     super(page);
//     this.lang = LANGUAGE[locale];
//     this.logoutBtnLocator = this.page.locator("//h3[contains(text(), 'Đăng xuất')]");





// }
// }
// //     readonly btnLogout = this.page.getByRole('link', { name: 'Đăng xuất' });
// //     readonly lblConfirmLogoutmsg = this.page.getByRole('heading', { name: 'Bạn có muốn đăng xuất ?' });
// //     readonly btnCancelLogout = this.page.getByRole('button', { name: 'Hủy' });
// //     readonly btnAgreeLogout = this.page.getByRole('button', { name: 'Đồng ý' });
// //     readonly lblLogoutmsg = this.page.getByRole('heading', { name: 'Đã đăng xuất' });

// //     constructor(page: Page) {
// //         super(page);

// //     }
// //     getLogoutConfirmMsgLocator(): Locator {
// //         return this.lblConfirmLogoutmsg;
// //     }
// //     getLogoutMsgLocator(): Locator {
// //         return this.lblLogoutmsg;
// //     }
// //     async clickLogout() {
// //         await this.click(this.btnLogout);
// //     }
// //     async getLogoutConfirmMessage() {
// //         await this.getText(this.lblConfirmLogoutmsg);
// //     }
// //     async clickCancelLogout() {
// //         await this.click(this.btnCancelLogout)
// //     }
// //     async clickLogoutAgain() {
// //         await this.click(this.btnLogout);
// //     }
// //     async clickAgreeLogout() {
// //         await this.click(this.btnAgreeLogout);
// //     }
// //     async getLogoutMessage() {
// //         await this.getText(this.lblLogoutmsg);
// //     }

// // }

