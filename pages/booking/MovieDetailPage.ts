import { Locator, Page } from "@playwright/test";
import { CommonPage } from "../common/CommonPage";
import { HomePage } from "../menu_pages/HomePage";
import { BasePage } from "../common/BasePage";
import { LANGUAGE } from "../constants";
import { Locale } from '../types'

export class MovieDetailPage extends BasePage {
    private readonly lang: Record<string, string>;
    readonly txtMovieTitleLocator!: Locator
    readonly txtMovieStartDateLocator!: Locator
    readonly txtMovieDurationLocator!: Locator
    readonly btnViewTrailerVideoLocator!: Locator
    readonly btnCloseTrailerVideoLocator!: Locator
    readonly btnMuaVeLocator!: Locator
    readonly btnSelectTimeSlotLocator!: Locator

    constructor(page: Page, locale: Locale) {
        super(page);
        this.lang = LANGUAGE[locale]
        this.txtMovieTitleLocator = this.page.locator("h1.MuiTypography-h1");
        this.txtMovieStartDateLocator = this.page.locator("div.MuiGrid-grid-xs-12 > h4.MuiTypography-h4");
        this.txtMovieDurationLocator = this.page.locator("h5.MuiTypography-h5");
        this.btnViewTrailerVideoLocator = this.page.locator('button:has(span.MuiFab-label)');
        this.btnMuaVeLocator = this.page.locator("//a[normalize-space(.)='Mua vé']");
        this.btnSelectTimeSlotLocator = this.page.locator('div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-3');
        this.btnCloseTrailerVideoLocator = this.page.locator("//button[contains(@class, 'modal-video-close-btn')]");
    }
    async muaVeBtn(): Promise<void> {
        await this.btnMuaVeLocator.click();
    }

    async getMovieTitle(): Promise<string> {
        try {
            const msg = await this.getText(this.txtMovieTitleLocator)
            return !msg ? '' : msg
        } catch (err) {
            console.log({
                context: 'MovieDetailPage.getMovieTitle',
                errorMessage: (err as Error)?.message ?? ''
            })
            return ''
        }
    }

    async getMovieStartDate(): Promise<string> {
        try {
            const msg = await this.getText(this.txtMovieStartDateLocator)
            return !msg ? '' : msg
        } catch (err) {
            console.log({
                context: 'MovieDetailPage.getMovieStartDate',
                errorMessage: (err as Error)?.message ?? ''
            })
            return ''
        }
    }

    async getMovieDuration(): Promise<string> {
        try {
            const msg = await this.getText(this.txtMovieDurationLocator)
            return !msg ? '' : msg
        } catch (err) {
            console.log({
                context: 'MovieDetailPage.getMovieDuration',
                errorMessage: (err as Error)?.message ?? ''
            })
            return ''
        }
    }

    async viewTrailerVideoBtn(): Promise<void> {
        // Chờ button xuất hiện trong DOM
        await this.btnViewTrailerVideoLocator.waitFor({ state: 'attached', timeout: 10000 });

        // // Hover để hiện button
        // await this.btnViewTrailerVideoLocator.hover();

        // Scroll vào view nếu cần
        await this.btnViewTrailerVideoLocator.scrollIntoViewIfNeeded();

        // Click bắt buộc dùng force nếu vẫn bị che phủ
        await this.btnViewTrailerVideoLocator.click({ force: true });
    }

    async closeTrailerVideoBtn(): Promise<void> {
        await this.page.waitForTimeout(5000);
        await this.btnCloseTrailerVideoLocator.click();
    }

    async clickRandomTimeSlot() {
        // Chờ render time slot
        await this.page.waitForTimeout(5000);

        // Lấy tất cả các time slot con trong #cinemaList
        const timeSlotLocator = this.page.locator('#vertical-tabpanel-0 div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-3');
        const timeSlotCount = await timeSlotLocator.count();
        if (timeSlotCount === 0) {
            throw new Error("Không tìm thấy khung giờ chiếu");
        }
        console.log("time slot count: ", timeSlotCount);

        // Chọn random
        const randomIndex = Math.floor(Math.random() * timeSlotCount);
        const selectedTimeSlot = timeSlotLocator.nth(randomIndex);
        const timeSlotTitle = await selectedTimeSlot.textContent();
        console.log("Time slot selected:", timeSlotTitle?.trim());

        // Click và chờ navigation đến Select Seat Page
        await Promise.all([
            this.page.waitForURL(url => url.toString().includes('/purchase/'), { timeout: 10000 }),
            selectedTimeSlot.click({ force: true })
        ]);

        console.log("Đã chuyển sang Select Seat Page");
    }

}







