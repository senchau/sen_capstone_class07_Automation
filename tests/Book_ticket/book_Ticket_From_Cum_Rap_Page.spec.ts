import test from "@playwright/test";
import { TopBarNavigation } from "../../pages/components/TopBarNavigation";
import { HomePage } from "../../pages/menu_pages/HomePage";

test('Book Ticket From Cum Rap Menu', async ({ page }) => {
    const topBarNavigation = new TopBarNavigation(page);
    const homePage = new HomePage(page);

    await homePage.navigateTo("https://demo1.cybersoft.edu.vn/");
    await topBarNavigation.openMenuItem('Cụm Rạp');



})