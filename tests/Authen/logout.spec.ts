import test, { expect } from "@playwright/test";
import { HomePage } from "../../pages/homepages/HomePage";
import { LoginPage } from "../../pages/authen/LoginPage";
import { LogoutPage } from "../../pages/authen/LogoutPage";

test('valid logout test', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const logoutPage = new LogoutPage(page);

    // Navigate to home page
    await homePage.navigateTo('https://demo1.cybersoft.edu.vn/');

    // Step 1: Login
    await homePage.topBarNavigation.navigateLoginPage();
    await loginPage.login("Testbb02a63727a845bc850256c55d2c1b77", "Test123456@");

    // Step 2: Click Logout button
    await logoutPage.clickLogout();

    // Step 3: VP1 Confirm Logout popup
    await expect(logoutPage.getLogoutConfirmMsgLocator()).toBeVisible();

    // Step 4: Click Cancel button on confirm popup
    await logoutPage.clickCancelLogout();

    // Step 5: Click Logout button again
    await logoutPage.clickLogoutAgain();

    // Step 6: Click Agree button on confirm popup
    await logoutPage.clickAgreeLogout();

    // Step 7: VP2 Verify logout message successfully
    await expect(logoutPage.getLogoutMsgLocator()).toBeVisible();
});
