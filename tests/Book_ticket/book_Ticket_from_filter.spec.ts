import test from "@playwright/test";
import { HomePage } from "../../pages/menu_pages/HomePage"


test('Book Ticket From Filter', async ({ page }) => {
    const homePage = new HomePage(page);

})