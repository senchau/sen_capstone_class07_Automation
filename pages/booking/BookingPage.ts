import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { Modal } from "../components/Modal";
import { IBaseResp, IGoReq } from "../../src/interfaces/commons";
import {
  IGetSeatListReq,
  IGetSeatListResp,
  ISeatResp,
  ISelectSeatByOrderResp,
} from "../../src/interfaces/bookings";
import { TLocale } from "../../src/types/locale";
import { HOME_PAGE_DOMAIN, SEAT_LIST_API } from "../../src/constants/endpoint";
import { SeatModel } from "../../src/models/Seat";
import { formatError, prettyErrorLog, normalizeUrl } from "../../helpers/utils";

export class BookingPage extends BasePage {
  private static instance: BookingPage;

  public readonly modal: Modal;

  private readonly seatsLocator!: Locator;
  private readonly buyTicketBtnLocator!: Locator;

  public showtimeId: string;
  public seatModels: SeatModel[] = [];
  public seatTotal: number = 0;

  constructor(page: Page, showtimeId: string, locale: TLocale) {
    super(page, locale);

    this.modal = new Modal(page, locale);

    this.showtimeId = showtimeId;

    this.seatsLocator = this.page.locator("//button[@tabindex]");
    this.buyTicketBtnLocator = this.page.locator(
      `//button[contains(normalize-space(), '${this.LANG.BOOKING_BUY_TICKET_BTN}')]`
    );
  }

  public static async go(page: Page, input: IGoReq): Promise<BookingPage> {
    if (!BookingPage.instance) {
      BookingPage.instance = new BookingPage(
        page,
        input.id || "",
        input.locale
      );
    }

    const self = BookingPage.instance;

    try {
      const prevUrl = normalizeUrl(page.url());
      const curUrl = normalizeUrl(
        HOME_PAGE_DOMAIN + `/purchase/${self.showtimeId}`
      );

      if (prevUrl !== curUrl) {
        await self.page.goto(curUrl);
      }

      const { data, errorMessage } = await self.getSeatList();
      if (!data) {
        throw new Error(errorMessage);
      }
      self.seatModels = data.seats;
      self.seatTotal = data.total;

      return self;
    } catch (err) {
      const error = formatError(err);
      prettyErrorLog(error);

      return self;
    }
  }

  async getSeatList(
    query?: IGetSeatListReq
  ): Promise<IBaseResp<IGetSeatListResp>> {
    let seats: SeatModel[] = [];
    let total = 0;

    try {
      const endpoint = SEAT_LIST_API + `?MaLichChieu=${this.showtimeId}`;
      const response = await this.page.waitForResponse(
        (res) => res.url() === endpoint && res.status() === 200
      );
      const body = await response.json();

      if (Array.isArray(body?.danhSachGhe)) {
        const danhSachGhe: ISeatResp[] = body.danhSachGhe || [];

        seats = danhSachGhe.map(
          (ghe) =>
            new SeatModel({
              id: ghe.maGhe.toString(),
              cinemaId: ghe.maRap.toString(),
              userId: ghe.taiKhoanNguoiDat ?? "",
              order: isNaN(+ghe.stt) ? -1 : +ghe.stt,
              seatName: ghe.tenGhe,
              seatType: ghe.loaiGhe === "Thuong" ? "Regular" : "Vip",
              price: ghe.giaVe,
              isBooked: ghe.daDat,
            })
        );
        if (typeof query?.isBooked === "boolean") {
          seats = seats?.filter((seat) => seat?.isBooked === query.isBooked);
        }

        total = seats.length;
      }

      return {
        data: {
          seats,
          total,
        },
      };
    } catch (err) {
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
        data: null,
      };
    }
  }

  getAvailableSeatList(): IBaseResp<IGetSeatListResp> {
    try {
      const availableSeats = this.seatModels.filter(
        (sealModel) => !sealModel.isBooked
      );

      return {
        data: {
          seats: availableSeats,
          total: availableSeats.length,
        },
      };
    } catch (err) {
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
        data: null,
      };
    }
  }

  async selectSeatByOrder(
    order: number
  ): Promise<IBaseResp<ISelectSeatByOrderResp>> {
    try {
      const seatLocator = this.seatsLocator.locator(`//span[.='${order}']`);

      await this.click(seatLocator);

      return {
        data: {
          locator: seatLocator,
        },
      };
    } catch (err) {
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
        data: null,
      };
    }
  }

  async bookTicketByOrder(order: number): Promise<IBaseResp<null>> {
    try {
      const { data, errorMessage } = await this.selectSeatByOrder(order);

      if (!data) {
        throw new Error(errorMessage);
      }

      await this.bookTicket();

      return {
        data: null,
      };
    } catch (err) {
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
        data: null,
      };
    }
  }

  async bookTicket(): Promise<IBaseResp<null>> {
    try {
      await this.click(this.buyTicketBtnLocator);

      return {
        data: null,
      };
    } catch (err) {
      const error = formatError(err);
      prettyErrorLog(error);

      return {
        errorMessage: error.message,
        data: null,
      };
    }
  }
}
