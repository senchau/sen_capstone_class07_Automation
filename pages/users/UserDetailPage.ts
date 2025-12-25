import { Locator, Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";
import { TLocale } from "../types";
import { LANGUAGE } from "../constants";

export class UserDetailPage extends BasePage {
    private readonly lang: Record<string, string>;
    readonly accountSettingTxtLocator!: Locator
    readonly passwordLocator!: Locator
    readonly emailLocator!: Locator
    readonly phoneNumberLocator!: Locator
    readonly customerTypeDropdownLocator!: Locator
    readonly updateBtnLocator!: Locator



    readonly passwordErrorMessageLocator!: Locator
    readonly emailErrorMessageLocator!: Locator
    readonly phoneNumberErrorMessageLocator!: Locator
    readonly emailExistMessageLocator !: Locator
    readonly updateSuccessfullyMessageLocator!: Locator

    constructor(page: Page, locale: TLocale) {
        super(page);

        this.lang = LANGUAGE[locale]

        this.accountSettingTxtLocator = this.page.locator('//h1[text()="Cài đặt tài khoản chung"]');
        this.passwordLocator = this.page.locator('#matKhau');
        this.emailLocator = this.page.locator('#email');
        this.phoneNumberLocator = this.page.locator('#soDt');
        this.customerTypeDropdownLocator = this.page.locator('#outlined-age-native-simple');
        this.updateBtnLocator = this.page.locator('//button[.//span[text()="Cập Nhật"]]');

        this.passwordErrorMessageLocator = this.page.locator('#matKhau-helper-text');
        this.emailErrorMessageLocator = this.page.locator('#email-helper-text');
        this.phoneNumberErrorMessageLocator = this.page.locator('#soDt-helper-text');
        this.emailExistMessageLocator = this.page.getByRole('heading', { name: 'Email đã tồn tại!' });
        this.updateSuccessfullyMessageLocator = this.page.getByRole('heading', { name: 'Cập nhật thành công' });

    }

    async waitUpdateModal(timeout: number): Promise<boolean> {
        try {
            await this.accountSettingTxtLocator.waitFor({ state: 'visible', timeout });
            return true
        } catch (err) {
            console.log({
                context: 'UserDetailPage.waitUpdateModal',
                errorMessage: (err as Error)?.message ?? ''
            })
            return false
        }
    }

    async fillUpdatePassword(value: string): Promise<void> {
        await this.fill(this.passwordLocator, value);
    }

    async fillUpdateEmail(value: string): Promise<void> {
        await this.fill(this.emailLocator, value);
    }

    async fillUpdatePhoneNumber(value: string): Promise<void> {
        await this.fill(this.phoneNumberLocator, value);
    }

    async selectCustomerType(): Promise<void> {
        await this.page.selectOption("select[name='maLoaiNguoiDung']", "QuanTri");
    }

    async getPasswordErrorMessage(): Promise<string> {
        try {
            const msg = await this.getText(this.passwordErrorMessageLocator)
            return !msg ? '' : msg
        } catch (err) {
            console.log({
                context: 'UserDetailPage.getPasswordErrorMessage',
                errorMessage: (err as Error)?.message ?? ''
            })
            return ''
        }
    }

    async getEmailErrorMessage(): Promise<string> {
        try {
            const msg = await this.getText(this.emailErrorMessageLocator)
            return !msg ? '' : msg
        } catch (err) {
            console.log({
                context: 'UserDetailPage.getEmailErrorMessage',
                errorMessage: (err as Error)?.message ?? ''
            })
            return ''
        }
    }

    async getPhoneNumberErrorMessage(): Promise<string> {
        try {
            const msg = await this.getText(this.phoneNumberErrorMessageLocator)
            return !msg ? '' : msg
        } catch (err) {
            console.log({
                context: 'UserDetailPage.getPhoneNumberErrorMessage',
                errorMessage: (err as Error)?.message ?? ''
            })
            return ''
        }
    }

    async getEmailExistErrorMessage(): Promise<string> {
        try {
            const msg = await this.getText(this.emailExistMessageLocator)
            return !msg ? '' : msg
        } catch (err) {
            console.log({
                context: 'UserDetailPage.getEmailExistErrorMessage',
                errorMessage: (err as Error)?.message ?? ''
            })
            return ''
        }
    }

    async getSuccessfullyUpdateMessage(): Promise<string> {
        try {
            const msg = await this.getText(this.updateSuccessfullyMessageLocator)
            return !msg ? '' : msg
        } catch (err) {
            console.log({
                context: 'UserDetailPage.getSuccessfullyUpdateMessage',
                errorMessage: (err as Error)?.message ?? ''
            })
            return ''
        }
    }

    async submitUpdateBtn() {
        await this.click(this.updateBtnLocator);
    }
}