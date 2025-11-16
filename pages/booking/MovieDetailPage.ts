import { Page } from "@playwright/test";
import { CommonPage } from "../common/CommonPage";
import { HomePage } from "../menu_pages/HomePage";

export class MovieDetailPage extends CommonPage {
    readonly homePage: HomePage
    readonly btnMuaVe = this.page.locator('a').filter({ hasText: 'C18AVATAR 2Khi tất cả những' });
    readonly btnViewVideo = this.page.getByRole('button', { name: 'video-button' });
    readonly btnCloseModal = this.page.getByRole('button', { name: 'Close the modal by clicking' });
    readonly btnMuaVeAtDetailPage = this.page.getByText('Mua vé');

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
    async clickbtnMuaVeAtDetailPage() {
        await this.click(this.btnMuaVeAtDetailPage);
    }

}