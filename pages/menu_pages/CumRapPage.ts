import { expect, Page } from "@playwright/test";
import { CommonPage } from "../common/CommonPage";


export class CumRapPage extends CommonPage {
    readonly lstClusterItems = this.page.getByRole('tab');
    readonly lstMovieItems = this.page.locator('.jss401');
    readonly lstTimeSlotByMovie = (movieIndex: number) =>
        this.lstMovieItems.nth(movieIndex).locator('.jss172 a');


    constructor(page: Page) {
        super(page);
    }
    /** Chọn cụm rạp theo index */
    async selectClusterByIndex(index: number) {
        const count = await this.lstClusterItems.count();
        expect(count).toBeGreaterThan(0);

        await this.lstClusterItems.nth(index).click();
        await expect(this.lstClusterItems.nth(index))
            .toHaveAttribute('aria-selected', 'true');
     console.log('Selected cluster index:', index);
     console.log('total rap', count);
        }
     /** Chọn ngẫu nhiên 1 phim + suất chiếu */
    async selectRandomTimeSlot() {
        const movieCount = await this.lstMovieItems.count();   
        expect(movieCount).toBeGreaterThan(0);

        const randomMovie = Math.floor(Math.random() * movieCount);
        const slots = this.lstTimeSlotByMovie(randomMovie);
        const slotCount = await slots.count();

        expect(slotCount).toBeGreaterThan(0);

        const randomSlot = Math.floor(Math.random() * slotCount);
        await slots.nth(randomSlot).click();

        // await expect(this.page).toHaveURL(/purchase/);
    }
}

