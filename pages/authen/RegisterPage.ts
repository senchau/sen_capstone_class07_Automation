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
    // readonly lblGlobalErrorMsg = this.page.getByText('Email đã tồn tại').or(this.page.getByText('Tài khoản đã tồn tại'));

    readonly lblGlobalMsg = this.page.getByText('Email đã tồn tại');
    // readonly lblInvalidEmailMsg = this.page.getByText('Email đã tồn tại!');


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
    async getErrorMessageRegister(fieldName: string): Promise<string | null> {
        switch (fieldName.toLowerCase()) {
            case 'account':
                return await this.lblAccountMsg.textContent();

            case 'password':
                return await this.lblPasswordMsg.textContent()
                    || await this.lblInvalidPasswordMsg.textContent();

            case 'confirmpassword':
                return await this.lblConfirmPasswordMsg.textContent();

            case 'fullname':
                return await this.lblFullNameMsg.textContent()
                    || await this.lblFullNameNumMsg.textContent();
        }
        return ''
    }

    async getGlobalErrorMessage(): Promise<string> {
        await this.lblGlobalMsg.waitFor({ state: 'visible', timeout: 20000 })
        if (await this.lblGlobalMsg.isVisible()) {
            return 'Email đã tồn tại!';
        }

        return '';
    }

    // case 'email':
    //     if (await this.lblExistEmailMsg.isVisible()) {
    //         return await this.lblExistEmailMsg.textContent();
    //     }
    //     if (await this.lblInvalidEmailMsg.isVisible()) {
    //         return await this.lblInvalidEmailMsg.textContent();
    //     }
    //     return null;

    // default:
    //     return null;
}



