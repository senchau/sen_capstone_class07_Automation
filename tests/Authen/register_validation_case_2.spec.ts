import { test, expect } from "@playwright/test";
import { RegisterPage } from "../../pages/authen/RegisterPage";
import { TopBarNavigationPage } from "../../pages/components/TopBarNavigationPage";
import { HOME_PAGE_DOMAIN } from '../../pages/constants'

const mandotoryFieldCases = [
    {
        account: '', password: '', confirm: '', fullName: '', email: '', field: 'account',
        title: 'Account, password, confirm password, fullname, email should be required',
    },
    // { account: 'user1', password: '', confirm: '', fullName: 'John Doe', email: 'user@example.com', field: 'password', message: 'Đây là trường bắt buộc !', requiresClick: false },
    // { account: 'user2', password: 'Pass1123', confirm: 'Pass12345', fullName: 'John Doe', email: 'user@example.com', field: 'confirmpassword', message: 'Mật khẩu không khớp !', requiresClick: false },
    // { account: 'user3', password: 'Pass@123', confirm: 'Pass@123', fullName: '', email: 'user@example.com', field: 'fullname', message: 'Đây là trường bắt buộc !', requiresClick: false },
    // { account: 'user4', password: '123', confirm: '123', fullName: 'John Doe', email: 'user@example.com', field: 'password', message: 'Mật khẩu phải có ít nhất 6 kí tự !', requiresClick: false },
    // { account: 'user5', password: 'Pass@123', confirm: 'Pass@123', fullName: 'anna123', email: 'user@example.com', field: 'fullname', message: 'Họ và tên không chứa số !', requiresClick: false },
];

for (const mandotoryFieldCase of mandotoryFieldCases) {
    test(mandotoryFieldCase.title, async ({ page }) => {
        await page.goto(HOME_PAGE_DOMAIN);

        const topbarNavigationPage = new TopBarNavigationPage(page, 'vi')

        const isNavigatedToSignUp = await topbarNavigationPage.goToSignUpPage();
        if (!isNavigatedToSignUp) {
            expect(isNavigatedToSignUp, "Không mở được popup đăng ký").toBe(true);
        }

        const registerPage = new RegisterPage(page, 'vi');

        // TODO: Them wait register form modal visible
        await registerPage.registerTextLocator.waitFor({ state: 'visible' });
        console.log('Đây là register form');
        // Fill form
        await registerPage.fillAccount(mandotoryFieldCase.account);
        await registerPage.fillPassword(mandotoryFieldCase.password);
        await registerPage.fillConfirmPassword(mandotoryFieldCase.confirm);
        await registerPage.fillFullname(mandotoryFieldCase.fullName);
        await registerPage.fillEmail(mandotoryFieldCase.email);

        // await registerPage.s();

        // Nếu cần server-side validation (email/account trùng) thì click register button
        // if (user.requiresClick) {
        //     await registerPage.clickRegisterFinal();
        //     const globalError = await registerPage.getGlobalErrorMessage();
        //     console.log('globalError', globalError)
        //     expect(globalError).toContain(user.message);
        // }

        // Lấy message và assert
        // const errorMsg = await registerPage.getErrorMessageRegister(user.field);
        // expect(errorMsg?.trim()).toContain(user.message);
    });
}
