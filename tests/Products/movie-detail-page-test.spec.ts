import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/menu_pages/HomePage"
import { MovieDetailPage } from "../../pages/booking/MovieDetailPage";
import { HOME_PAGE_DOMAIN, LANGUAGE } from "../../pages/constants";

test("Test View Movie Detail", async ({ page }) => {
    const locale = 'vi';
    const homePage = new HomePage(page, locale);
    const movieDetailPage = new MovieDetailPage(page, locale);

    await page.goto(HOME_PAGE_DOMAIN);

    //  Select random movie
    const movieSelected = await homePage.clickRandomMovie();
    console.log(" Movie Selected: ", movieSelected);

     // Verify UI hiển thị (không rỗng, visible)
    const titleAtDetailPage = await movieDetailPage.getMovieTitle();
    const durationAtDetail = await movieDetailPage.getMovieDuration();
    const movieStartDate = await movieDetailPage.getMovieStartDate();

   
    expect(titleAtDetailPage).not.toBe('');
    expect(durationAtDetail).not.toBe('');
    expect(movieStartDate).not.toBe('');
    console.log("Title at Detail Page:", titleAtDetailPage);
    console.log("Duration at Detail Page:", durationAtDetail);
    console.log("Start Date at Detail Page:", movieStartDate);
    
//  Click view trailer video on Movie Detail Page
await movieDetailPage.viewTrailerVideoBtn();
await movieDetailPage.closeTrailerVideoBtn();

//  Click mua ve button
await movieDetailPage.muaVeBtn();

//  Select random time slot
const timeSlotSelected = await movieDetailPage.clickRandomTimeSlot();
 console.log("test done");
});





