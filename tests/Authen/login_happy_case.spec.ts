import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/homepages/HomePage';
import { LoginPage } from '../../pages/authen/LoginPage';

test('Valid login test', async ({ page }) => {

  let homePage: HomePage = new HomePage(page);
  let loginPage: LoginPage = new LoginPage(page);

  homePage.navigateTo('https://demo1.cybersoft.edu.vn/');

  // Step 1: Click "Đăng Nhập"
  await homePage.topBarNavigation.navigateLoginPage();

  // Step 2: Enter Username

  // Step 3: Enter Password

  // Step 4: Click Đăng Nhập
  await loginPage.login("Testbb02a63727a845bc850256c55d2c1b77", "Test123456@");

  // Step 5: Verify login successfully
  await expect(loginPage.getLoginMsgLocator()).toBeVisible();

  // Step 6: Verify user profile
  await expect(homePage.topBarNavigation.getUserProfileLocator("John Kenny")).toBeVisible();
});