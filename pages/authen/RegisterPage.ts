import { Locator, Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";
import { Locale } from '../types'
import { LANGUAGE } from '../constants'

export class RegisterPage extends BasePage {
    readonly btnRegister = this.page.getByRole('link', { name: 'Đăng Ký' });
    readonly txtAccount = this.page.getByRole('textbox', { name: 'Tài Khoản' });
    readonly txtPassword = this.page.getByRole('textbox', { name: 'Mật Khẩu', exact: true });
    readonly txtConfirmPassword = this.page.getByRole('textbox', { name: 'Nhập lại mật khẩu' });
    readonly txtFullName = this.page.getByRole('textbox', { name: 'Họ Tên' });
    readonly txtEmail = this.page.getByRole('textbox', { name: 'Email' });
    readonly btnRegisterFinal = this.page.getByRole('button', { name: 'Đăng ký' });
    readonly lblRegisterMsg = this.page.getByRole('heading', { name: 'Đăng ký thành công' });

    // // Error message
    readonly lblAccountMsg = this.page.getByText('Đây là trường bắt buộc !');
    readonly lblPasswordMsg = this.page.locator('#matKhau-helper-text');
    readonly lblConfirmPasswordMsg = this.page.getByText('Mật khẩu không khớp !');
    readonly lblInvalidPasswordMsg = this.page.getByText('Mật khẩu phải có ít nhất 6 k');
    readonly lblFullNameMsg = this.page.locator('#hoTen-helper-text');
    readonly lblFullNameNumMsg = this.page.getByText('Họ và tên không chứa số !');
    // readonly lblGlobalErrorMsg = this.page.getByText('Email đã tồn tại').or(this.page.getByText('Tài khoản đã tồn tại'));

    readonly lblGlobalMsg = this.page.getByText('Email đã tồn tại');
    // // readonly lblInvalidEmailMsg = this.page.getByText('Email đã tồn tại!');

    private readonly lang: Record<string, string>;
    readonly accountLocator!: Locator
    readonly passwordLocator!: Locator
    readonly confirmPasswordLocator!: Locator
    readonly fullnameLocator!: Locator
    readonly emailLocator!: Locator
    readonly registerBtnLocator!: Locator
    readonly registerTextLocator!: Locator


    // message
    readonly accountMessageLocator!: Locator
    readonly passwordMessageLocator!: Locator
    readonly confirmPasswordMessageLocator!: Locator
    readonly fullNameessageLocator!: Locator
    readonly emailMessageLocator!: Locator
    readonly registerSuccessfullyMessageLocator!: Locator


    constructor(page: Page, locale: Locale) {
        super(page);

        this.lang = LANGUAGE[locale]

        this.accountLocator = this.page.locator('#taiKhoan');
        this.passwordLocator = this.page.locator('#matKhau');
        this.confirmPasswordLocator = this.page.locator('#confirmPassWord');
        this.fullnameLocator = this.page.locator('#hoTen');
        this.emailLocator = this.page.locator('#email');
        this.registerBtnLocator = this.page.locator(`//button[@type='submit' and contains(normalize-space(.), ${this.lang.registerBtn})]`);
        this.registerTextLocator = this.page.locator('//h1[text()="Đăng ký"]');
    
    
    // error message locator
        this.accountMessageLocator = this.page.locator('#taiKhoan-helper-text');
        this.passwordMessageLocator = this.page.locator('#matKhau-helper-text');
        this.confirmPasswordLocator = this.page.locator('#hoTen-helper-text');
        this.emailMessageLocator = this.page.locator('#email-helper-text');
    }

    getRegisterMsgLocator(): Locator {
        return this.lblRegisterMsg;
    }

    async clickRegister() {
        await this.click(this.btnRegister);
    }

    async fillAccount(value: string): Promise<void> {
        await this.fill(this.accountLocator, value);
    }

    async fillPassword(value: string): Promise<void> {
        await this.fill(this.passwordLocator, value);
    }

    async fillConfirmPassword(value: string): Promise<void> {
        await this.fill(this.confirmPasswordLocator, value);
    }

    async fillFullname(value: string): Promise<void> {
        await this.fill(this.fullnameLocator, value);
    }

    async fillEmail(value: string) {
        await this.fill(this.emailLocator, value);
    }

    async submitRegisterBtn() {
        await this.click(this.registerBtnLocator);
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



