
import { Locator, Page } from "@playwright/test";
import { MovieDetailPage } from './MovieDetailPage';

export class SeatSelectionPage extends MovieDetailPage {
    readonly btnSelectTime = this.page.getByRole('link', { name: '-09-2021  ~  01:58' });
    readonly btnSelectSeat = this.page.getByRole('button', { name: '88' });
    readonly txtSeatConfirm = this.page.getByText('Ghế');
    readonly btnDatVe = this.page.getByRole('button', { name: 'ĐẶT VÉ' });
    readonly lblWarningLoginMsg = this.page.getByRole('heading', { name: 'Bạn chưa đăng nhập' });
    readonly btnNoLoigin = this.page.getByRole('button', { name: 'Không' });
    readonly btnYesLogin = this.page.getByRole('button', { name: 'Đồng ý' });

    constructor(page: Page) {
        super(page);

    }
    getTxtSeatConfirmLocator(): Locator {
        return this.txtSeatConfirm;
    }
    getTxtWarningLoginLocator(): Locator {
        return this.lblWarningLoginMsg;
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

}