import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { TopBarNavigationPage } from "../components/TopBarNavigationPage";

export class CommonPage extends BasePage {
    readonly topBarNavigation: TopBarNavigationPage

    constructor(page: Page) {
 super(page);
        this.topBarNavigation = new TopBarNavigationPage(page, 'vi');
    }
}