
import { expect, test } from "@playwright/test";
import { HomePage } from "../../pages/menu_pages/HomePage";
import { LoginPage } from "../../pages/authen/LoginPage";
import { MovieDetailPage } from "../../pages/booking/MovieDetailPage";
import { SeatSelectionPage } from "../../pages/booking/SeatSelectionPage";


test("Book ticket if no select seat", async ({ page }) => {
  let homePage: HomePage = new HomePage(page);
  let loginPage: LoginPage = new LoginPage(page, 'vi');
  let movieDetailPage = new MovieDetailPage(page);
  let selectSeatPage = new SeatSelectionPage(page);


  // Step 1: Navigate to homepage
  await homePage.navigateTo('https://demo1.cybersoft.edu.vn/');

  // Step 2: Navigate to Login Page
  await homePage.topBarNavigation.navigateLoginPage();
  await loginPage.login("Testbb02a63727a845bc850256c55d2c1b77", "Test123456@");

  // Step 3: Click mua ve button at HomePage
  await movieDetailPage.clickMuaVe();

  //  Step 4: Click mua ve button at Detail Page
  await movieDetailPage.clickbtnMuaVeAtDetailPage();

  //  Step 5: Select time
  await selectSeatPage.clickbtnSelectTime();


  // Step 9: Click Dat ve button
  await selectSeatPage.clickbtnDatVe();

  // Step 10: Verify warning message
  await expect(selectSeatPage.getTxtNoSelectSeatLocator()).toBeVisible();

  // Step 11: Click Understood button to close popup
  await selectSeatPage.clickbtnUnderstood();
  console.log("test done");
});
