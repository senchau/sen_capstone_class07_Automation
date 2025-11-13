import { Locator, Page } from "@playwright/test";
import { CommonPage } from "../common/CommonPage";

export class RegisterPage extends CommonPage {
    readonly btnRegister = this.page.getByRole('link', { name: 'Đăng Ký' });
    readonly txtAccount = this.page.getByRole('textbox', { name: 'Tài Khoản' });
    readonly txtPassword = this.page.getByRole('textbox', { name: 'Mật Khẩu', exact: true });
    readonly txtConfirmPassword = this.page.getByRole('textbox', { name: 'Nhập lại mật khẩu' });
    readonly txtFullName = this.page.getByRole('textbox', { name: 'Họ Tên' });
    readonly txtEmail = this.page.getByRole('textbox', { name: 'Email' });
    readonly btnRegisterFinal = this.page.getByRole('button', { name: 'Đăng ký' });
    readonly lblRegisterMsg = this.page.getByRole('heading', { name: 'Đăng ký thành công' });

    // Error message
    readonly lblAccountMsg = this.page.getByText('Đây là trường bắt buộc !');
    readonly lblPasswordMsg = this.page.locator('#matKhau-helper-text');
    readonly lblConfirmPasswordMsg = this.page.getByText('Mật khẩu không khớp !');
    readonly lblInvalidPasswordMsg = this.page.getByText('Mật khẩu phải có ít nhất 6 k');
    readonly lblFullNameMsg = this.page.locator('#hoTen-helper-text');
    readonly lblFullNameNumMsg = this.page.getByText('Họ và tên không chứa số !');
    readonly lblExistEmailMsg = this.page.getByText(/Email đã tồn tại/i);
    readonly lblInvalidEmailMsg = this.page.getByText(/Tài khoản đã tồn tại/i);


    constructor(page: Page) {
        super(page);
    }
    getRegisterMsgLocator(): Locator {
        return this.lblRegisterMsg;
    }
    async clickRegister() {
        await this.click(this.btnRegister);
    }
    async enterAccount(value: string) {
        await this.fill(this.txtAccount, value);
    }
    async enterPassword(value: string) {
        await this.fill(this.txtPassword, value);
    }
    async enterConfirmPassword(value: string) {
        await this.fill(this.txtConfirmPassword, value);
    }
    async enterFullName(value: string) {
        await this.fill(this.txtFullName, value);
    }
    async enterEmail(value: string) {
        await this.fill(this.txtEmail, value);
    }
    async clickRegisterFinal() {
        await this.click(this.btnRegisterFinal);
    }
    async getRegisterMsg() {
        await this.getText(this.lblRegisterMsg);
    }
    // Lấy message lỗi theo từng field
    async getErrorMessage(fieldName: string): Promise<string | null> {
        switch (fieldName.toLowerCase()) {
            case 'account':
                if (await this.lblAccountMsg.isVisible()) return await this.lblAccountMsg.textContent();
                break;

            case 'password':
                if (await this.lblPasswordMsg.isVisible()) return await this.lblPasswordMsg.textContent();
                if (await this.lblInvalidPasswordMsg.isVisible()) return await this.lblInvalidPasswordMsg.textContent();
                break;

            case 'confirm':
            case 'confirmpassword':
                if (await this.lblConfirmPasswordMsg.isVisible()) return await this.lblConfirmPasswordMsg.textContent();
                break;

            case 'fullname':
                if (await this.lblFullNameMsg.isVisible()) return await this.lblFullNameMsg.textContent();
                if (await this.lblFullNameNumMsg.isVisible()) return await this.lblFullNameNumMsg.textContent();
                break;

            case 'email':
                if (await this.lblExistEmailMsg.isVisible()) return await this.lblExistEmailMsg.textContent();
                if (await this.lblInvalidEmailMsg.isVisible()) return await this.lblInvalidEmailMsg.textContent();
                break;
        }
        return null;
    }
}

