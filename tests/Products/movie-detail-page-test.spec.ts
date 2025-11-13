import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/homepages/HomePage"
import { MovieDetailPage } from "../../pages/booking/MovieDetailPage";

test("Test View Movie Detail", async ({ page }) => {
    const homePage: HomePage = new HomePage(page);
    const movieDetailPage = new MovieDetailPage(page);

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
});

