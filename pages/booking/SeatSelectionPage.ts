
import { Locator, Page } from "@playwright/test";
import { MovieDetailPage } from './MovieDetailPage';

export class SeatSelectionPage extends MovieDetailPage {
    readonly btnSelectTime = this.page.getByRole('link', { name: '-10-2021  ~  01:00' });
    readonly btnSelectSeat = this.page.getByRole('button', { name: '88' });
    readonly txtSeatConfirm = this.page.getByText('Ghế');
    readonly btnDatVe = this.page.getByRole('button', { name: 'ĐẶT VÉ' });
    readonly lblWarningLoginMsg = this.page.getByRole('heading', { name: 'Bạn chưa đăng nhập' });
    readonly btnNoLogin = this.page.getByRole('button', { name: 'Không' });
    readonly btnYesLogin = this.page.getByRole('button', { name: 'Đồng ý' });
    readonly availableSeats = this.page.locator('button:not([disabled]) .MuiButton-label');
    readonly lblBookTicketSuccessfulMsg = this.page.locator('//h2[text()="Đặt vé thành công"]');
    readonly btnYes = this.page.getByRole('button', { name: 'Đồng ý' });
    readonly lblNoSelectSeat = this.page.getByRole('heading', { name: 'Bạn chưa chọn ghế' });
    readonly btnUnderstood = this.page.getByRole('button', { name: 'Đã hiểu' });
    
    constructor(page: Page) {
        super(page);

    }
    getTxtSeatConfirmLocator(): Locator {
        return this.txtSeatConfirm;
    }
    getTxtWarningLoginLocator(): Locator {
        return this.lblWarningLoginMsg;
    }
    getTxtBookTicketSuccessfulLocator(): Locator {
        return this.lblBookTicketSuccessfulMsg;
    }
    getTxtNoSelectSeatLocator(): Locator {
        return this.lblNoSelectSeat;
    }
    async clickbtnSelectTime() {
        await this.click(this.btnSelectTime);
    }
    async clickbtnSelectSeat() {
        await this.click(this.btnSelectSeat);
    }
    async getTxtSeatConfirm() {
        await this.getText(this.txtSeatConfirm);
    }
    async clickbtnDatVe() {
        await this.click(this.btnDatVe);
    }
    async clickbtnNoLogin() {
        await this.click(this.btnNoLogin);
    }
    async clickbtnYesLogin() {
        await this.click(this.btnYesLogin);
    }
    async selectFirstavailableSeat() {
        await this.page.waitForSelector('button:not([disabled]) .MuiButton-label');
        const count = await this.availableSeats.count();
        console.log('availableSeats', count);
        if (count > 0) {
            await this.availableSeats.first().click()
        } else {
            throw new Error('Không có ghế khả dụng để chọn');
        }

    }
    async clickbtnYes() {
        await this.click(this.btnYes);
    }
    async clickbtnUnderstood() {
        await this.click(this.btnUnderstood);
    }
}