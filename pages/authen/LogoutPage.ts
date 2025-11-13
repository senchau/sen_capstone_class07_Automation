import { Locator, Page } from "@playwright/test";
import { CommonPage } from "../common/CommonPage";

export class LogoutPage extends CommonPage {
    readonly btnLogout = this.page.getByRole('link', { name: 'Đăng xuất' });
    readonly lblConfirmLogoutmsg = this.page.getByRole('heading', { name: 'Bạn có muốn đăng xuất ?' });
    readonly btnCancelLogout = this.page.getByRole('button', { name: 'Hủy' });
    readonly btnAgreeLogout = this.page.getByRole('button', { name: 'Đồng ý' });
    readonly lblLogoutmsg = this.page.getByRole('heading', { name: 'Đã đăng xuất' });

    constructor(page: Page) {
        super(page);

    }
    getLogoutConfirmMsgLocator(): Locator {
        return this.lblConfirmLogoutmsg;
    }
    getLogoutMsgLocator(): Locator {
        return this.lblLogoutmsg;
    }
    async clickLogout() {
        await this.click(this.btnLogout);
    }
    async getLogoutConfirmMessage() {
        await this.getText(this.lblConfirmLogoutmsg);
    }
    async clickCancelLogout() {
        await this.click(this.btnCancelLogout)
    }
    async clickLogoutAgain() {
        await this.click(this.btnLogout);
    }
    async clickAgreeLogout() {
        await this.click(this.btnAgreeLogout);
    }
    async getLogoutMessage() {
        await this.getText(this.lblLogoutmsg);
    }

}

