import test, { expect } from "@playwright/test";
import { RegisterPage } from "../../pages/authen/RegisterPage";
import { HomePage } from "../../pages/homepages/HomePage"

test('Valid Register test', async ({ page }) => {
    let homePage: HomePage = new HomePage(page);
    let registerPage: RegisterPage = new RegisterPage(page);

    const random = Math.floor(Math.random() * 100000);
    const account = `user${random}`
    const email = `user${random}@example.com`;
    const password = `Pass@${random}`;


    homePage.navigateTo('https://demo1.cybersoft.edu.vn/');
    // Step 1: Click Đăng Ký button
    await registerPage.clickRegister();

    //  Step 2: Enter Account
    await registerPage.enterAccount(account);

    // Step 3: Enter Password
    await registerPage.enterPassword(password);

    // Step 4: Enter Confirm Password
    await registerPage.enterConfirmPassword(password);

    // Step 5: Enter Full Name
    await registerPage.enterFullName("user test");

    // Step 6: Enter Email
    await registerPage.enterEmail(email);

    // Step 7: Click Đăng ký button
    await registerPage.clickRegisterFinal();

    // Step 8: VP Register successfully message

    await expect(registerPage.getRegisterMsgLocator()).toBeVisible();
})