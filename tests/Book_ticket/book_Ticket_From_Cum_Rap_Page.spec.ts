import test, { expect } from "@playwright/test";
import { TopBarNavigationPage } from "../../pages/components/TopBarNavigationPage";
import { HomePage } from "../../pages/menu_pages/HomePage";
import { CumRapPage } from "../../pages/menu_pages/CumRapPage";

test('Book Ticket From Cum Rap Menu', async ({ page }) => {
    const topBarNavigation = new TopBarNavigationPage(page, 'vi');
    const homePage = new HomePage(page);
    const cumRapPage = new CumRapPage(page);

    // Step 1: Open Homepage va open menu Cụm Rạp
    await homePage.navigateTo("https://demo1.cybersoft.edu.vn/");
    await topBarNavigation.openMenuItem('Cụm Rạp');


    await cumRapPage.selectClusterByIndex(0);


    // Step 3: Verify danh sách phim hiển thị
    await cumRapPage.selectRandomTimeSlot();

    await expect(page).toHaveURL(/purchase/);
});

//  Step 4: Chọn khung giờ của 1 phim


//  Step 5: navigate to SelectSeatPage
