import { test, expect } from "@playwright/test";
import { RegisterPage } from "../../pages/authen/RegisterPage";
import { HomePage } from "../../pages/homepages/HomePage";


const negativeUsers = [
    { account: 'usertest1', password: 'Pass@123', confirm: 'Pass@123', fullName: 'John Doe', email: '%$%%%', field: 'email', message: 'Email đã tồn tại!', requiresClick: true }, // server-side
    { account: 'usertest2', password: 'Pass123456', confirm: 'Pass123456', fullName: 'user test', email: 'usertest@gmail.com', field: 'email', message: 'Email đã tồn tại!', requiresClick: true }, // server-side
];

for (const usertest of negativeUsers) {
    test(`Invalid register test - [${usertest.account}] - ${usertest.message}`, async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const homePage = new HomePage(page);

        // Navigate to home
        await homePage.navigateTo('https://demo1.cybersoft.edu.vn/');
        await registerPage.clickRegister();

        // Fill form fields
        await registerPage.enterAccount(usertest.account);
        await registerPage.enterPassword(usertest.password);
        await registerPage.enterConfirmPassword(usertest.confirm);
        await registerPage.enterFullName(usertest.fullName);
        await registerPage.enterEmail(usertest.email);

        // Nếu cần server-side validation (email/account trùng) thì click register button
        if (usertest.requiresClick) {
            await registerPage.clickRegisterFinal();
            const globalError = await registerPage.getGlobalErrorMessage();
            // console.log('globalError', globalError)
            expect(globalError).toContain(usertest.message);
        }
    });
}
