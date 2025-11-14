import test, { expect } from "@playwright/test";
import { RegisterPage } from "../../pages/authen/RegisterPage";
import { HomePage } from "../../pages/homepages/HomePage"
import { HOME_PAGE_DOMAIN } from "../../pages/constants";
import { TopBarNavigationPage } from "../../pages/components/TopBarNavigationPage";

test('Valid Register test', async ({ page }) => {
    // Mở trang chủ
    await page.goto(HOME_PAGE_DOMAIN);

    const topbarNavigationPage = new TopBarNavigationPage(page, 'vi');

    // Chờ popup đăng ký hiển thị
    const isNavigatedToSignUp = await topbarNavigationPage.goToSignUpPage();
    expect(isNavigatedToSignUp, "Không mở được popup đăng ký").toBe(true);

    const registerPage = new RegisterPage(page, 'vi');

    const random = Math.floor(Math.random() * 100000);
    const account = `user${random}`;
    const email = `user${random}@example.com`;
    const password = `Pass@${random}`;

    // Click Đăng Ký để mở form (nếu cần)
    await registerPage.clickRegister();

    // Điền thông tin đăng ký
    await registerPage.fillAccount(account);
    await registerPage.fillPassword(password);
    await registerPage.fillConfirmPassword(password);
    await registerPage.fillFullname("user test");
    await registerPage.fillEmail(email);

    // Submit form
    await registerPage.submitRegisterBtn();

    // Verify success message hiển thị
    await expect(registerPage.getRegisterMsgLocator()).toBeVisible({ timeout: 5000 });

    // Pause để debug nếu cần
    await page.pause();
});
