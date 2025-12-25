import test, { expect } from "@playwright/test";
import { RegisterPage } from "../../pages/authen/RegisterPage";
import { HOME_PAGE_DOMAIN, LANGUAGE } from "../../pages/constants";
import { TopBarNavigationPage } from "../../pages/components/TopBarNavigationPage";


test('Valid Register test', async ({ page }) => {
    // Mở trang chủ
    const locale = 'vi';
    await page.goto(HOME_PAGE_DOMAIN);

    const topbarNavigationPage = new TopBarNavigationPage(page, locale);
    const lang = LANGUAGE[locale];


    // Chờ popup đăng ký hiển thị
    const isNavigatedToSignUp = await topbarNavigationPage.goToSignUpPage();
    expect(isNavigatedToSignUp, "Không mở được popup đăng ký").toBe(true);

    const registerPage = new RegisterPage(page, locale);

    await registerPage.registerRandomUser();

    //  VP Register successfully message
    const registerSuccessfullyMessage = await registerPage.getregisterSuccessfullyMessage();
    expect(registerSuccessfullyMessage).toContain(lang.registerSuccessfullyMessage);


});
