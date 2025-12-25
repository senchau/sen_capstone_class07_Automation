import { expect, Locator, Page } from "@playwright/test";
import { CommonPage } from '../common/CommonPage';
import { LANGUAGE } from "../constants";
import { TLocale } from "../types";
import { BasePage } from "../common/BasePage";


export class HomePage extends BasePage {
    private readonly lang: Record<string, string>;
    readonly muaVeBtnLocator!: Locator
    readonly trailerVideoBtnLocator!: Locator
    readonly lstMoviesLocator!: Locator
    readonly paginationNextBtnLocator!: Locator
    readonly movieTitleLocator!: Locator
    

    constructor(page: Page, locale: TLocale) {
        super(page);
        this.lang = LANGUAGE[locale]
      
        this.trailerVideoBtnLocator = this.page.locator("//img[@alt='video-button']/ancestor::button");
        this.lstMoviesLocator = this.page.locator('div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-4.MuiGrid-grid-md-3');
        this.muaVeBtnLocator = this.page.getByRole('link', { name: 'MUA VÉ', exact: true })
        this.paginationNextBtnLocator = this.page.locator("//button[contains(@class, 'MuiIconButton-root') and .//svg[@class='MuiSvgIcon-root']]");
    this.movieTitleLocator = this.page.locator('div.jss936');
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
    
    async getAllMovies(): Promise<{ title: string; description: string; c18: string }[]> {
        const count = await this.lstMoviesLocator.count();
        const movies = await Promise.all(
            Array.from({ length: count }, (_, i) =>
                (async () => {
                    const card = this.lstMoviesLocator.nth(i);
                    const title = (await card.locator('div.jss936').textContent())?.trim() || '';
                    const description = (await card.locator("//div[contains(@class,'jss935')]/div/h4").textContent())?.trim() || '';
                    const c18 = (await card.locator("//div[contains(@class,'jss1186')]/span").textContent())?.trim() || '';
                    return { title, description, c18 };
                })()
            )
        );
        return movies;
    }


}



