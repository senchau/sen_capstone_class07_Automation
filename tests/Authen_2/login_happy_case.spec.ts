import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/authen/LoginPage';
import { RegisterPage } from '../../pages/authen/RegisterPage';
import { HOME_PAGE_DOMAIN, LANGUAGE } from '../../pages/constants';
import { TopBarNavigationPage } from '../../pages/components/TopBarNavigationPage';


test('Valid login test', async ({ page }) => {
  const locale = 'vi';

  await page.goto(HOME_PAGE_DOMAIN);

  const topbarNavigationPage = new TopBarNavigationPage(page, locale);
  const lang = LANGUAGE[locale];

  await topbarNavigationPage.goToSignUpPage();

  const registerPage = new RegisterPage(page, locale);

  const randomUser = await registerPage.registerRandomUser();
  await page.waitForTimeout(1000)
  await page.goto(HOME_PAGE_DOMAIN);

  const isNavigatedToSignIn = await topbarNavigationPage.goToSignInPage();
  expect(isNavigatedToSignIn, "Không mở được popup đăng nhập").toBe(true);
  const loginPage = new LoginPage(page, locale);

  // Chờ popup đăng nhập hiển thị
  await loginPage.waitLoginModal


  // Fill Account, Password + CLick Login Btn
  await loginPage.login(randomUser.account, randomUser.password);

  // Step 5: Verify login successfully
  const loginSuccessfullyMessage = await loginPage.getLoginSuccessfullyMessage();
  expect(loginSuccessfullyMessage).toContain(lang.loginSuccessfullyMessage);



  // Step 6: Verify user profile
  await expect(topbarNavigationPage.getUserProfileLocator(randomUser.account)).toBeVisible();
});