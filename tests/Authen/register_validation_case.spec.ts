import { test, expect } from "@playwright/test";
import { RegisterPage } from "../../pages/authen/RegisterPage";
import { HomePage } from "../../pages/homepages/HomePage";
import { LocaleErrors } from '../../pages/constants'

const negativeUsers = [
    { account: '', password: 'Pass@123', confirm: 'Pass@123', fullName: 'John Doe', email: 'user@example.com', field: 'account', message: 'Đây là trường bắt buộc !', requiresClick: false },
    { account: 'user1', password: '', confirm: '', fullName: 'John Doe', email: 'user@example.com', field: 'password', message: 'Đây là trường bắt buộc !', requiresClick: false },
    { account: 'user2', password: 'Pass1123', confirm: 'Pass12345', fullName: 'John Doe', email: 'user@example.com', field: 'confirmpassword', message: 'Mật khẩu không khớp !', requiresClick: false },
    { account: 'user3', password: 'Pass@123', confirm: 'Pass@123', fullName: '', email: 'user@example.com', field: 'fullname', message: 'Đây là trường bắt buộc !', requiresClick: false },
    { account: 'user4', password: '123', confirm: '123', fullName: 'John Doe', email: 'user@example.com', field: 'password', message: 'Mật khẩu phải có ít nhất 6 kí tự !', requiresClick: false },
    { account: 'user5', password: 'Pass@123', confirm: 'Pass@123', fullName: 'anna123', email: 'user@example.com', field: 'fullname', message: 'Họ và tên không chứa số !', requiresClick: false },
];


for (const user of negativeUsers) {
    test(`Validation register test - [${user.account}] - ${user.message}`, async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const homePage = new HomePage(page);

        // Navigate to home
        await homePage.navigateTo('https://demo1.cybersoft.edu.vn/');
        await registerPage.clickRegister();

        // Fill form fields
        await registerPage.enterAccount(user.account);
        await registerPage.enterPassword(user.password);
        await registerPage.enterConfirmPassword(user.confirm);
        await registerPage.enterFullName(user.fullName);
        await registerPage.enterEmail(user.email);

        // Nếu cần server-side validation (email/account trùng) thì click register button
        // if (user.requiresClick) {
        //     await registerPage.clickRegisterFinal();
        //     const globalError = await registerPage.getGlobalErrorMessage();
        //     console.log('globalError', globalError)
        //     expect(globalError).toContain(user.message);
        // }

        // Lấy message và assert
        const errorMsg = await registerPage.getErrorMessageRegister(user.field);
        expect(errorMsg?.trim()).toContain(user.message);
    });
}
