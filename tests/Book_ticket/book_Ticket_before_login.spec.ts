import test, { expect } from "@playwright/test";
import { MovieDetailPage } from "../../pages/booking/MovieDetailPage";
import { HomePage } from "../../pages/homepages/HomePage";
import { SeatSelectionPage } from "../../pages/booking/SeatSelectionPage";

test('Valid select seat test', async ({ page }) => {
    const homePage: HomePage = new HomePage(page);
    const movieDetailPage = new MovieDetailPage(page);
    const seatSelectionPage = new SeatSelectionPage(page);

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
    await seatSelectionPage.clickbtnSelectSeat();

    // Step 7: Check text seat confirm
    await expect(seatSelectionPage.getTxtSeatConfirmLocator()).toBeVisible();

    // Step 8: Click Dat Ve button
    await seatSelectionPage.clickbtnDatVe();

    // Step 9: Verify error warning Login message

});



