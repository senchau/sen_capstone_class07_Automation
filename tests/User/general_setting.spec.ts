import test, { expect } from "@playwright/test"
import { HOME_PAGE_DOMAIN, LANGUAGE } from "../../pages/constants"
import { TopBarNavigationPage } from "../../pages/components/TopBarNavigationPage"
import { UserDetailPage } from "../../pages/users/UserDetailPage"
import { LoginPage } from "../../pages/authen/LoginPage"
import { title } from "process"


const locale = 'vi'
const validUpdateCase = {
    password: 'Update123456@', email: 'updateemail@gmail.com', phoneNumber: '0123456789',
    title: 'Update user successfully',
}

const mandotoryFieldCase = {
    password: '', email: '', phoneNumber: '',
    title: 'password, email, phone number should be required',
}

const existEmailCase = {
    email: 'anna@yopmail.com',
    title: 'Email already existed',
}

const validationPasswordCase = {
    password: 'Pass',
    title: 'Password should be greater than 6 characters',
};


test(validUpdateCase.title, async ({ page }) => {
    const lang = LANGUAGE[locale];
    await page.goto(HOME_PAGE_DOMAIN);
    const topbarNavigationPage = new TopBarNavigationPage(page, 'vi');
    const loginPage = new LoginPage(page, 'vi');
    // Step 1: Login
    await topbarNavigationPage.goToSignInPage();
    await loginPage.login("anna", "Hitpay123!");
    await page.waitForTimeout(5000);
    const isNavigatedToAccount = await topbarNavigationPage.goToAccountPage();
    const userDetailPage = new UserDetailPage(page, 'vi');
    const isShowAccount = await userDetailPage.waitUpdateModal(20000);

    if (!isShowAccount || !isNavigatedToAccount) {
        expect(isShowAccount, "Không mở được popup update").toBe(true);
    }

    await userDetailPage.fillUpdatePassword(validUpdateCase.password)
    await userDetailPage.fillUpdateEmail(validUpdateCase.email);
    await userDetailPage.fillUpdatePhoneNumber(validUpdateCase.phoneNumber);
    await userDetailPage.selectCustomerType();
    await userDetailPage.submitUpdateBtn();

    const successfullyUpdateMessage = await userDetailPage.getSuccessfullyUpdateMessage();
    expect(successfullyUpdateMessage).toContain(lang.updateUserSuccessfullyMessage);
})

test(mandotoryFieldCase.title, async ({ page }) => {
    const lang = LANGUAGE[locale];
    await page.goto(HOME_PAGE_DOMAIN);
    const topbarNavigationPage = new TopBarNavigationPage(page, 'vi');
    const loginPage = new LoginPage(page, 'vi');
    // Step 1: Login
    await topbarNavigationPage.goToSignInPage();
    await loginPage.login("anna", "Hitpay123!");
    await page.waitForTimeout(5000);
    const isNavigatedToAccount = await topbarNavigationPage.goToAccountPage();
    const userDetailPage = new UserDetailPage(page, 'vi');
    const isShowAccount = await userDetailPage.waitUpdateModal(20000);

    if (!isShowAccount || !isNavigatedToAccount) {
        expect(isShowAccount, "Không mở được popup update").toBe(true);
    }

    await userDetailPage.fillUpdatePassword(mandotoryFieldCase.password)
    await userDetailPage.fillUpdateEmail(mandotoryFieldCase.email);
    await userDetailPage.fillUpdatePhoneNumber(mandotoryFieldCase.phoneNumber);
    await userDetailPage.selectCustomerType();
    await userDetailPage.submitUpdateBtn();



    const passwordErrorMessage = await userDetailPage.getPasswordErrorMessage();
    expect(passwordErrorMessage).toContain(lang.mandatoryField);

    const emailErrorMessage = await userDetailPage.getEmailErrorMessage();
    expect(emailErrorMessage).toContain(lang.mandatoryField);

    const phoneNumerErrorMessage = await userDetailPage.getPhoneNumberErrorMessage();
    expect(phoneNumerErrorMessage).toContain(lang.phoneNumberErrorMessage);
});

test(existEmailCase.title, async ({ page }) => {
    const lang = LANGUAGE[locale];
    await page.goto(HOME_PAGE_DOMAIN);
    const topbarNavigationPage = new TopBarNavigationPage(page, 'vi');
    const loginPage = new LoginPage(page, 'vi');
    // Step 1: Login
    await topbarNavigationPage.goToSignInPage();
    await loginPage.login("anna", "Hitpay123!");
    await page.waitForTimeout(5000);
    const isNavigatedToAccount = await topbarNavigationPage.goToAccountPage();
    const userDetailPage = new UserDetailPage(page, 'vi');
    const isShowAccount = await userDetailPage.waitUpdateModal(20000);

    if (!isShowAccount || !isNavigatedToAccount) {
        expect(isShowAccount, "Không mở được popup update").toBe(true);
    }

    await userDetailPage.fillUpdateEmail(existEmailCase.email);
    await userDetailPage.selectCustomerType();
    await userDetailPage.submitUpdateBtn();

    const existEmailMessage = await userDetailPage.getEmailExistErrorMessage();
    expect(existEmailMessage).toContain(lang.globalEmailErrorMessage);
});

test(validationPasswordCase.title, async ({ page }) => {
    const lang = LANGUAGE[locale];
    await page.goto(HOME_PAGE_DOMAIN);
    const topbarNavigationPage = new TopBarNavigationPage(page, 'vi');
    const loginPage = new LoginPage(page, 'vi');
    // Step 1: Login
    await topbarNavigationPage.goToSignInPage();
    await loginPage.login("anna", "Hitpay123!");
    await page.waitForTimeout(5000);
    const isNavigatedToAccount = await topbarNavigationPage.goToAccountPage();
    const userDetailPage = new UserDetailPage(page, 'vi');
    const isShowAccount = await userDetailPage.waitUpdateModal(20000);

    if (!isShowAccount || !isNavigatedToAccount) {
        expect(isShowAccount, "Không mở được popup update").toBe(true);
    }

    await userDetailPage.fillUpdatePassword(validationPasswordCase.password);
    await userDetailPage.selectCustomerType();
    await userDetailPage.submitUpdateBtn();

    const validPasswordMessage = await userDetailPage.getPasswordErrorMessage();
    expect(validPasswordMessage).toContain(lang.passwordGreaterThan6Characters);
});



