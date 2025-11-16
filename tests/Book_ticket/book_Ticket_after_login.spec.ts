import { expect, test } from "@playwright/test";
import { HomePage } from "../../pages/menu_pages/HomePage";
import { LoginPage } from "../../pages/authen/LoginPage";
import { MovieDetailPage } from "../../pages/booking/MovieDetailPage";
import { SeatSelectionPage } from "../../pages/booking/SeatSelectionPage";


test("Valid buy ticket test", async ({ page }) => {
  let homePage: HomePage = new HomePage(page);
  let loginPage: LoginPage = new LoginPage(page);
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

  //  Step 7: Select seat
  await selectSeatPage.selectFirstavailableSeat();

  // Step 8: Confirm selected seat
  // await expect(selectSeatPage.getTxtSeatConfirmLocator()).toBeVisible();
  // const selectedSeat = await page.locator('h3:has-text("Chọn:") span').textContent();
  // await page.waitForSelector('h3:has-text("Chọn:") span');
  // console.log('Ghế đã chọn:', selectedSeat);
  // Step 9: Click Dat ve button
  await selectSeatPage.clickbtnDatVe();

  // Step 10: Verify message Dat ve thanh cong
  await expect(selectSeatPage.getTxtBookTicketSuccessfulLocator()).toBeVisible();

  // Step 11: Click Yes button to close  Dat ve thanh cong popup
  await selectSeatPage.clickbtnYes();
  console.log("test done");
});
