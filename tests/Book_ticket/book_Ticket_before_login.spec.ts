import test, { expect } from "@playwright/test";
import { MovieDetailPage } from "../../pages/booking/MovieDetailPage";
import { HomePage } from "../../pages/menu_pages/HomePage";
import { SeatSelectionPage } from "../../pages/booking/SeatSelectionPage";
import { RegisterPage } from "../../pages/authen/RegisterPage";
import { LoginPage } from "../../pages/authen/LoginPage";

test('Valid select seat test', async ({ page }) => {
    const homePage: HomePage = new HomePage(page);
    const movieDetailPage = new MovieDetailPage(page);
    const seatSelectionPage = new SeatSelectionPage(page);
    const loginPage = new LoginPage(page);

    // Step 1: Open Homepage
    await homePage.navigateTo("https://demo1.cybersoft.edu.vn/");

    // Step 2: Chon moview de view detail
    await movieDetailPage.clickMuaVe();
    //  Step 3: Xem trailer video
    await movieDetailPage.clickbtnViewVideo();
    // Step 4: Close video trailer
    await movieDetailPage.clickbtnCloseModal();
    // // Step 4: Click mua ve
    // await movieDetailPage.clickMuaVe();

    // Step 5: Click select time
    await seatSelectionPage.clickbtnSelectTime();

    // Step 6: Click Select Seat
    await seatSelectionPage.selectFirstavailableSeat();

    // Step 7: Check text seat confirm
    // await expect(seatSelectionPage.getTxtSeatConfirmLocator()).toBeVisible();

    // Step 8: Click Dat Ve button
    await seatSelectionPage.clickbtnDatVe();

    // Step 9: Verify error warning Login message
    await expect(seatSelectionPage.getTxtWarningLoginLocator()).toBeVisible();

    // Step 10: Click No login button
    await seatSelectionPage.clickbtnNoLogin();

    // Step 11: Click Dat Ve button again
    await seatSelectionPage.clickbtnDatVe();

    //  Step 12: Click Yes login button
    await seatSelectionPage.clickbtnYesLogin();

    // Step 13: VP Login page display
    await expect(loginPage.getlblLoginFormLocator()).toBeVisible();

});



