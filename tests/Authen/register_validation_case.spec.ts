import { test, expect } from "@playwright/test";
import { RegisterPage } from "../../pages/authen/RegisterPage";
import { TopBarNavigationPage } from "../../pages/components/TopBarNavigationPage";
import { HOME_PAGE_DOMAIN, LANGUAGE } from '../../pages/constants'

const locale = 'vi'

const mandotoryFieldCase =
{
    account: '', password: '', confirmPassword: '', fullName: '', email: '',
    title: 'Account, password, confirm password, fullname, email should be required',
}

const verifyPasswordCase = {
    account: 'user2', password: 'Pass1123', confirmPassword: 'Pass12345', fullName: 'John Doe', email: 'user@example.com',
    title: 'Password and confirm password should be matched',
};

const verifyFullNameCase = {
    account: 'user3', password: 'Pass@123', confirmPassword: 'Pass@123', fullName: 'John1234', email: 'user@example.com',
    title: 'FullName not be contained number',
};

const validationPasswordCase = {
    account: 'user4', password: 'Pass', confirmPassword: 'Pass', fullName: 'John Doe', email: 'user@example.com',
    title: 'Password should be greater than 6 characters',
};

const globalAccountErrorMessageCase = {
    account: 'user5', password: 'Pass@123', confirmPassword: 'Pass@123', fullName: 'John Doe', email: 'user5@example.com',
    title: 'Account is existed',
};

const globalEmailErrorMessageCase = {
    account: 'user6', password: 'Pass@123', confirmPassword: 'Pass@123', fullName: 'John Doe', email: 'user@example.com',
    title: 'Email is existed',
};



test(mandotoryFieldCase.title, async ({ page }) => {
    const lang = LANGUAGE[locale];

    await page.goto(HOME_PAGE_DOMAIN);

    const topbarNavigationPage = new TopBarNavigationPage(page, locale)

    const isNavigatedToSignUp = await topbarNavigationPage.goToSignUpPage();

    const registerPage = new RegisterPage(page, locale);
    const isShowSignUp = await registerPage.waitRegisterModal(20000);

    if (!isShowSignUp || !isNavigatedToSignUp) {
        expect(isShowSignUp, "Không mở được popup đăng ký").toBe(true);
    }


    await registerPage.fillAccount(mandotoryFieldCase.account);
    await registerPage.fillPassword(mandotoryFieldCase.password);
    await registerPage.fillConfirmPassword(mandotoryFieldCase.confirmPassword);
    await registerPage.fillFullname(mandotoryFieldCase.fullName);
    await registerPage.fillEmail(mandotoryFieldCase.email);
    await registerPage.submitRegisterBtn()

    const accountErrorMessage = await registerPage.getAccountErrorMessage();
    expect(accountErrorMessage).toContain(lang.mandatoryField);

    const passwordErrorMessage = await registerPage.getPasswordErrorMessage();
    expect(passwordErrorMessage).toContain(lang.mandatoryField);

    const confirmPasswordErrorMessage = await registerPage.getConfirmPasswordErrorMessage();
    expect(confirmPasswordErrorMessage).toContain(lang.mandatoryField);

    const fullnameErrorMessage = await registerPage.getFullNameErrorMessage();
    expect(fullnameErrorMessage).toContain(lang.mandatoryField);

    const emailErrorMessage = await registerPage.getEmailErrorMessage();
    expect(emailErrorMessage).toContain(lang.mandatoryField);
});

test(verifyPasswordCase.title, async ({ page }) => {
    const lang = LANGUAGE[locale]

    await page.goto(HOME_PAGE_DOMAIN);

    const topbarNavigationPage = new TopBarNavigationPage(page, locale)

    const isNavigatedToSignUp = await topbarNavigationPage.goToSignUpPage();

    const registerPage = new RegisterPage(page, locale);
    const isShowSignUp = await registerPage.waitRegisterModal(20000);

    if (!isShowSignUp || !isNavigatedToSignUp) {
        expect(isShowSignUp, "Không mở được popup đăng ký").toBe(true);
    }


    await registerPage.fillAccount(verifyPasswordCase.account);
    await registerPage.fillPassword(verifyPasswordCase.password);
    await registerPage.fillConfirmPassword(verifyPasswordCase.confirmPassword);
    await registerPage.fillFullname(verifyPasswordCase.fullName);
    await registerPage.fillEmail(verifyPasswordCase.email);
    await registerPage.submitRegisterBtn()

    const confirmPasswordErrorMessage = await registerPage.getConfirmPasswordErrorMessage();
    expect(confirmPasswordErrorMessage).toContain(lang.passwordNotMatched);
});

test(verifyFullNameCase.title, async ({ page }) => {
    const lang = LANGUAGE[locale]

    await page.goto(HOME_PAGE_DOMAIN);

    const topbarNavigationPage = new TopBarNavigationPage(page, locale)

    const isNavigatedToSignUp = await topbarNavigationPage.goToSignUpPage();

    const registerPage = new RegisterPage(page, locale);
    const isShowSignUp = await registerPage.waitRegisterModal(20000);

    if (!isShowSignUp || !isNavigatedToSignUp) {
        expect(isShowSignUp, "Không mở được popup đăng ký").toBe(true);
    }


    await registerPage.fillAccount(verifyFullNameCase.account);
    await registerPage.fillPassword(verifyFullNameCase.password);
    await registerPage.fillConfirmPassword(verifyFullNameCase.confirmPassword);
    await registerPage.fillFullname(verifyFullNameCase.fullName);
    await registerPage.fillEmail(verifyFullNameCase.email);
    await registerPage.submitRegisterBtn()

    const fullnameErrorMessage = await registerPage.getFullNameErrorMessage();
    expect(fullnameErrorMessage).toContain(lang.fullNameNotContainedNumber);
});

test(validationPasswordCase.title, async ({ page }) => {
    const lang = LANGUAGE[locale]

    await page.goto(HOME_PAGE_DOMAIN);

    const topbarNavigationPage = new TopBarNavigationPage(page, locale)

    const isNavigatedToSignUp = await topbarNavigationPage.goToSignUpPage();

    const registerPage = new RegisterPage(page, locale);
    const isShowSignUp = await registerPage.waitRegisterModal(20000);

    if (!isShowSignUp || !isNavigatedToSignUp) {
        expect(isShowSignUp, "Không mở được popup đăng ký").toBe(true);
    }


    await registerPage.fillAccount(validationPasswordCase.account);
    await registerPage.fillPassword(validationPasswordCase.password);
    await registerPage.fillConfirmPassword(validationPasswordCase.confirmPassword);
    await registerPage.fillFullname(validationPasswordCase.fullName);
    await registerPage.fillEmail(validationPasswordCase.email);
    await registerPage.submitRegisterBtn()

    const passwordErrorMessage = await registerPage.getPasswordErrorMessage();
    expect(passwordErrorMessage).toContain(lang.passwordGreaterThan6Characters);
});

test(globalAccountErrorMessageCase.title, async ({ page }) => {
    const lang = LANGUAGE[locale]

    await page.goto(HOME_PAGE_DOMAIN);

    const topbarNavigationPage = new TopBarNavigationPage(page, locale)

    const isNavigatedToSignUp = await topbarNavigationPage.goToSignUpPage();

    const registerPage = new RegisterPage(page, locale);
    const isShowSignUp = await registerPage.waitRegisterModal(20000);

    if (!isShowSignUp || !isNavigatedToSignUp) {
        expect(isShowSignUp, "Không mở được popup đăng ký").toBe(true);
    }


    await registerPage.fillAccount(globalAccountErrorMessageCase.account);
    await registerPage.fillPassword(globalAccountErrorMessageCase.password);
    await registerPage.fillConfirmPassword(globalAccountErrorMessageCase.confirmPassword);
    await registerPage.fillFullname(globalAccountErrorMessageCase.fullName);
    await registerPage.fillEmail(globalAccountErrorMessageCase.email);
    await registerPage.submitRegisterBtn()

    const globalAccountErrorMessage = await registerPage.getGlobalErrorMessage();
    expect(globalAccountErrorMessage).toContain(lang.globalAccountErrorMessage);
});

test(globalEmailErrorMessageCase.title, async ({ page }) => {
    const lang = LANGUAGE[locale]

    await page.goto(HOME_PAGE_DOMAIN);

    const topbarNavigationPage = new TopBarNavigationPage(page, locale)

    const isNavigatedToSignUp = await topbarNavigationPage.goToSignUpPage();

    const registerPage = new RegisterPage(page, locale);
    const isShowSignUp = await registerPage.waitRegisterModal(20000);

    if (!isShowSignUp || !isNavigatedToSignUp) {
        expect(isShowSignUp, "Không mở được popup đăng ký").toBe(true);
    }


    await registerPage.fillAccount(globalEmailErrorMessageCase.account);
    await registerPage.fillPassword(globalEmailErrorMessageCase.password);
    await registerPage.fillConfirmPassword(globalEmailErrorMessageCase.confirmPassword);
    await registerPage.fillFullname(globalEmailErrorMessageCase.fullName);
    await registerPage.fillEmail(globalEmailErrorMessageCase.email);
    await registerPage.submitRegisterBtn()

    const globalEmailErrorMessage = await registerPage.getGlobalErrorMessage();
    expect(globalEmailErrorMessage).toContain(lang.globalEmailErrorMessage);
});