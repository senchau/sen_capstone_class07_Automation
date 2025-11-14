import { Locator, Page } from "@playwright/test";
import { CommonPage } from "../common/CommonPage";


export class LoginPage extends CommonPage {
    readonly txtAccountLogin = this.page.getByRole('textbox', { name: 'Tài Khoản' });
    readonly txtPasswordLogin = this.page.getByRole('textbox', { name: 'Mật Khẩu' });
    readonly btnLogin = this.page.getByRole('button', { name: 'Đăng nhập' });
    readonly lblLoginMsg = this.page.getByRole('heading', { name: 'Đăng nhập thành công' });
    readonly btnDoNotHaveAccount = this.page.getByRole('link', { name: 'Bạn chưa có tài khoản? Đăng ký' });
    readonly lblRegister = this.page.getByRole('heading', { name: 'Đăng ký', exact: true });

    // Error message
    readonly lblAccountLoginMsg = this.page.locator('#taiKhoan-helper-text');  // not fill account
    readonly lblPasswordLoginMsg = this.page.locator('#matKhau-helper-text');   // not fill pass
    readonly lblInvalidLoginMsg = this.page.getByText('Tài khoản hoặc mật khẩu không'); // fill invalid acc + pass
    readonly lblInvalidPasswordMsg = this.page.getByText('Mật khẩu phải có ít nhất 6 k'); // fill invalid pass


    constructor(page: Page) {
        super(page);

    }
    getLoginMsgLocator(): Locator {
        return this.lblLoginMsg;
    }
    async enterUserName(value: string) {
        await this.fill(this.txtAccountLogin, value);
    }
    async enterPassWord(value: string) {
        await this.fill(this.txtPasswordLogin, value);
    }
    async clickLogin() {
        await this.click(this.btnLogin);
    }
    async login(Username: string, Password: string) {
        await this.enterUserName(Username);
        await this.enterPassWord(Password);
        await this.click(this.btnLogin);
    }
    async getLoginMessage() {
        await this.getText(this.lblLoginMsg)
    }
    // Lấy message lỗi theo từng field
    async getErrorMessageLogin(fieldName: string): Promise<string | null> {
        switch (fieldName.toLowerCase()) {
            case 'account':
                if (await this.lblAccountLoginMsg.isVisible())
                    return await this.lblAccountLoginMsg.textContent();
                break;
            case 'password':
                if (await this.lblPasswordLoginMsg.isVisible())
                    return await this.lblPasswordLoginMsg.textContent();
                if (await this.lblInvalidPasswordMsg.isVisible())
                    return await this.lblInvalidPasswordMsg.textContent();
                break;
            case 'login':  // thêm case cho invalid login chung
                return await this.lblInvalidLoginMsg.textContent();

        }
        return null;


    }

}
