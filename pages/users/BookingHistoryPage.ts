import { Locator, Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";
import { LANGUAGE } from "../constants";
import { TLocale } from "../types"


export class BookingHistoryPage extends BasePage {
    private readonly lang: Record<string, string>;
    readonly bookingHistoryTxtLocator!: Locator
    readonly bookingHistoryItemLocator!: Locator



    constructor(page: Page, locale: TLocale) {
        super(page);
        this.lang = LANGUAGE[locale]
        this.bookingHistoryTxtLocator = this.page.getByRole('heading', { name: 'Lịch sử đặt vé' });
        this.bookingHistoryItemLocator = this.page.locator('div.jss22');
    }

    async waitBookingHistoryModal(timeout: number): Promise<boolean> {
        try {
            await this.bookingHistoryTxtLocator.waitFor({ state: 'visible', timeout });
            return true
        } catch (err) {
            console.log({
                context: 'BookingHistoryPage.waitBookingHistoryModal',
                errorMessage: (err as Error)?.message ?? ''
            })
            return false
        }
    }

    async totalBookingItems(): Promise<number> {
        const total = await this.bookingHistoryItemLocator.count();
        console.log('Total booking items:', total);
        return total;
    }
}

