import test, { expect } from "@playwright/test";
import { HomePage } from "../../pages/homepages/HomePage";
import { LoginPage } from "../../pages/authen/LoginPage";

const negativeUsersLogin = [
    { account: '', password: 'Test123456@', field: 'account', message: 'Đây là trường bắt buộc !' },
    { account: 'user2', password: '', field: 'password', message: 'Đây là trường bắt buộc !' },
    { account: 'user3', password: '123', field: 'password', message: 'Mật khẩu phải có ít nhất 6 kí tự !' },
    { account: 'user4', password: 'Test123456@', field: 'login', message: 'Tài khoản hoặc mật khẩu không đúng!' },
];

for (const users of negativeUsersLogin) {
    test(`Invalid Login test - [${users.account}] - ${users.message}`, async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        // Step 1: Navigate to homepage
        await homePage.navigateTo('https://demo1.cybersoft.edu.vn/');

        // Step 2: Click “Đăng Nhập”
        await homePage.topBarNavigation.navigateLoginPage();

        // Step 3: Fill form
        await loginPage.enterUserName(users.account);
        await loginPage.enterPassWord(users.password);

        // Step 4: Click Login
        await loginPage.clickLogin();

        // Step 5: Get error message
        const errorMsg = await loginPage.getErrorMessageLogin(users.field);

        // Step 6: Assert
        expect(errorMsg?.trim()).toContain(users.message);
    });
}
