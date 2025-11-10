import { Page } from "@playwright/test";
import { CommonPage } from "../common/CommonPage";
import { HomePage } from "../homepages/HomePage";

export class MovieDetailPage extends CommonPage {
    readonly homePage: HomePage
    readonly btnMuaVe = this.page.locator('a').filter({ hasText: 'C18The GentlemenQuý ông thế' });
    readonly btnViewVideo = this.page.getByRole('button', { name: 'video-button' });
    readonly btnCloseModal = this.page.getByRole('button', { name: 'Close the modal by clicking' });

    constructor(page: Page) {
        super(page);
        this.homePage = new HomePage(page);
    }
    async clickMuaVe() {
        await this.click(this.btnMuaVe);

    }
    async clickbtnViewVideo() {
        await this.click(this.btnViewVideo);
    }
    async clickbtnCloseModal() {
        await this.click(this.btnCloseModal);
    }

}