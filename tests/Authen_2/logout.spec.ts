import test, { expect } from "@playwright/test";
import { TopBarNavigationPage } from "../../pages/components/TopBarNavigationPage";
import { LogoutConfirmPage } from "../../pages/authen/LogoutConfirmPage";
import { HOME_PAGE_DOMAIN, LANGUAGE } from "../../pages/constants";
import { LoginPage } from "../../pages/authen/LoginPage";


test('User logout with confirm popup', async ({ page }) => {
    const locale = 'vi';
    await page.goto(HOME_PAGE_DOMAIN);
    const lang = LANGUAGE[locale];
    const topbarNavigation = new TopBarNavigationPage(page, 'vi');
    const loginPage = new LoginPage(page, 'vi');
    const logoutConfirmPopup = new LogoutConfirmPage(page, 'vi');

    // Step 1: Login
    await topbarNavigation.goToSignInPage();
    await loginPage.login("Testbb02a63727a845bc850256c55d2c1b77", "Test123456@");

    // Step 1: Open Logout popup
    await topbarNavigation.openLogoutConfirmPopup();

    // Step 2: Confirm logout
    await logoutConfirmPopup.confirmLogout();

    // Step 3: Verify loglout successfully popup
    const logoutSuccessfullyMessage = await logoutConfirmPopup.getLogoutSuccessfullyMessage();
    expect(logoutSuccessfullyMessage).toContain(lang.logoutSuccessfullyMessage);
});

test('User cancel logout', async ({ page }) => {
    const locale = 'vi';
    await page.goto(HOME_PAGE_DOMAIN);
    const lang = LANGUAGE[locale];
    const topbarNavigation = new TopBarNavigationPage(page, 'vi');
    const loginPage = new LoginPage(page, 'vi');
    const logoutConfirmPopup = new LogoutConfirmPage(page, 'vi');

    // Step 1: Login
    await topbarNavigation.goToSignInPage();
    await loginPage.login("Testbb02a63727a845bc850256c55d2c1b77", "Test123456@");

    // Step 1: Open Logout popup
    await topbarNavigation.openLogoutConfirmPopup();

    // Step 2: Confirm logout
    await logoutConfirmPopup.cancelLogout();
});
