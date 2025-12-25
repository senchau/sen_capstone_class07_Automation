import test, { expect } from "@playwright/test";
import { HomePage } from "../../pages/menu_pages/HomePage";
import { LoginPage } from "../../pages/authen/LoginPage";
import { HOME_PAGE_DOMAIN, LANGUAGE } from "../../pages/constants";
import { TopBarNavigationPage } from "../../pages/components/TopBarNavigationPage";

const locale = 'vi';

const mandotoryFieldLoginCase =
{
    account: '', password: '',
    title: 'Account, Password is required',
}

const validationPasswordLoginCase =
{
    account: 'user4', password: 'Pass',
    title: 'Password should be greater than 6 characters',
}

const globalLoginErrorMessageCase = {
    account: 'user6', password: 'Pass@123',
    title: 'Account and Password should be matched',

};



test(mandotoryFieldLoginCase.title, async ({ page }) => {
    const lang = LANGUAGE[locale];

    await page.goto(HOME_PAGE_DOMAIN);

    const topbarNavigationPage = new TopBarNavigationPage(page, locale);
    await topbarNavigationPage.goToSignInPage();

    const isNavigatedToSignIn = await topbarNavigationPage.goToSignInPage();
    expect(isNavigatedToSignIn, "Không mở được popup đăng nhập").toBe(true);
    const loginPage = new LoginPage(page, locale);

    // Chờ popup đăng nhập hiển thị
    await loginPage.waitLoginModal

    await loginPage.fillAccount(mandotoryFieldLoginCase.account);
    await loginPage.fillPassword(mandotoryFieldLoginCase.password);
    await loginPage.submitloginBtn();

    const accountLoginErrorMessage = await loginPage.getAccountLoginErrorMessage();
    expect(accountLoginErrorMessage).toContain(lang.mandatoryField);

    const passwordLoginErrorMessage = await loginPage.getPasswordLoginErrorMessage();
    expect(passwordLoginErrorMessage).toContain(lang.mandatoryField);

})

test(validationPasswordLoginCase.title, async ({ page }) => {
    const lang = LANGUAGE[locale];

    await page.goto(HOME_PAGE_DOMAIN);

    const topbarNavigationPage = new TopBarNavigationPage(page, locale);
    await topbarNavigationPage.goToSignInPage();

    const isNavigatedToSignIn = await topbarNavigationPage.goToSignInPage();
    expect(isNavigatedToSignIn, "Không mở được popup đăng nhập").toBe(true);
    const loginPage = new LoginPage(page, locale);

    // Chờ popup đăng nhập hiển thị
    await loginPage.waitLoginModal

    await loginPage.fillAccount(validationPasswordLoginCase.account);
    await loginPage.fillPassword(validationPasswordLoginCase.password);
    await loginPage.submitloginBtn();

    const passwordLoginErrorMessage = await loginPage.getPasswordLoginErrorMessage();
    expect(passwordLoginErrorMessage).toContain(lang.passwordGreaterThan6Characters);

})

test(globalLoginErrorMessageCase.title, async ({ page }) => {
    const lang = LANGUAGE[locale];

    await page.goto(HOME_PAGE_DOMAIN);

    const topbarNavigationPage = new TopBarNavigationPage(page, locale);
    await topbarNavigationPage.goToSignInPage();

    const isNavigatedToSignIn = await topbarNavigationPage.goToSignInPage();
    expect(isNavigatedToSignIn, "Không mở được popup đăng nhập").toBe(true);
    const loginPage = new LoginPage(page, locale);

    // Chờ popup đăng nhập hiển thị
    await loginPage.waitLoginModal

    await loginPage.fillAccount(globalLoginErrorMessageCase.account);
    await loginPage.fillPassword(globalLoginErrorMessageCase.password);
    await loginPage.submitloginBtn();

    const globalAccountErrorMessage = await loginPage.getglobalLoginErrorMessage();
    expect(globalAccountErrorMessage).toContain(lang.globalLoginErrorMessage);

})

