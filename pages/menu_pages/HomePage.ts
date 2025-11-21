import { expect, Locator, Page } from "@playwright/test";
import { CommonPage } from '../common/CommonPage';
import { LANGUAGE } from "../constants";
import { Locale } from "../types";
import { BasePage } from "../common/BasePage";


export class HomePage extends BasePage {
    private readonly lang: Record<string, string>;
    readonly muaVeBtnLocator!: Locator
    readonly trailerVideoBtnLocator!: Locator
    readonly lstMoviesLocator!: Locator
    

    constructor(page: Page, locale: Locale) {
        super(page);
        this.lang = LANGUAGE[locale]
      
        this.trailerVideoBtnLocator = this.page.locator("//img[@alt='video-button']/ancestor::button");
        this.lstMoviesLocator = this.page.locator('div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-4.MuiGrid-grid-md-3');
        this.muaVeBtnLocator = this.page.getByRole('link', { name: 'MUA VÉ', exact: true })
    }

    async muaVeBtn(): Promise<void> {
        await this.muaVeBtnLocator.click();
    }


    async clickRandomMovie(): Promise<string> {
        // Chờ danh sách movie hiển thị
        await this.page.waitForSelector('div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-4.MuiGrid-grid-md-3', { timeout: 5000 });

        const movieCount = await this.lstMoviesLocator.count();
        if (movieCount === 0) {
            throw new Error("Không tìm thấy movie nào trên homepage");
        }

        const maxIndex = Math.min(8, movieCount) - 1;
        const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
        console.log("Movie count:", movieCount);

        const movieItem = this.lstMoviesLocator.nth(randomIndex);
    

        // LẤY TITLE
        const movieTitle = (await movieItem.innerText()).trim();
        console.log("Movie selected:", movieTitle);

        // CLICK VÀO MOVIE
        await movieItem.click();

        return movieTitle; // trả về tên movie để verify
    }


}



