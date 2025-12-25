import { Page, Locator } from "@playwright/test";
import { GlobalPage } from "./GlobalPage";
import { IBaseOutput, IGoInput } from "../../src/interfaces/commons";
import { TLocale } from "../../src/types/locale";
import { LANGUAGE } from "../../src/constants/language";
import { HOME_PAGE_DOMAIN, SEAT_LIST_API } from "../../src/constants/endpoint";
import { SeatModel } from "../../src/models/Seat";
import { normalizeUrl } from "../../helpers/utils";

export interface ISeatResp {
  maGhe: number;
  maRap: number;
  taiKhoanNguoiDat: string | null;
  stt: string;
  tenGhe: string;
  loaiGhe: "Thuong" | "Vip";
  giaVe: number;
  daDat: boolean;
}

export interface IGetSeatListQuery {
  isBooked?: boolean;
}

export interface IGetSeatListResp {
  seats: SeatModel[];
  total: number;
}

export interface ISelectSeatByOrderResponse {
  locator: Locator;
}

export class BookingPage extends GlobalPage {
  private static instance: BookingPage;
  private readonly LANG: Record<string, string>;

  private readonly seatsLocator!: Locator;
  private readonly buyTicketBtnLocator!: Locator;

  public showtimeId: string;
  public seatModels: SeatModel[] = [];
  public seatTotal: number = 0;

  constructor(page: Page, showtimeId: string, locale: TLocale) {
    super(page);

    this.showtimeId = showtimeId;
    this.LANG = LANGUAGE[locale];

    this.seatsLocator = this.page.locator("//button[@tabindex]");
    this.buyTicketBtnLocator = this.page.locator(
      `//button[contains(normalize-space(), '${this.LANG.BOOKING_BUY_TICKET_BTN}')]`
    );
  }

  public static async go(page: Page, input: IGoInput): Promise<BookingPage> {
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
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "BookingPage.go",
        errorMessage,
      });

      return self;
    }
  }

  async getSeatList(
    query?: IGetSeatListQuery
  ): Promise<IBaseOutput<IGetSeatListResp>> {
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
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "BookingPage.getSeatList",
        errorMessage,
      });

      return {
        errorMessage,
        data: null,
      };
    }
  }

  getAvailableSeatList(): IBaseOutput<IGetSeatListResp> {
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
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "BookingPage.getAvailableSeatList",
        errorMessage,
      });

      return {
        errorMessage,
        data: null,
      };
    }
  }

  async selectSeatByOrder(
    order: number
  ): Promise<IBaseOutput<ISelectSeatByOrderResponse>> {
    try {
      const seatLocator = this.seatsLocator.locator(`//span[.='${order}']`);

      await this.click(seatLocator);

      return {
        data: {
          locator: seatLocator,
        },
      };
    } catch (err) {
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "BookingPage.selectSeatByOrder",
        errorMessage,
      });

      return {
        errorMessage,
        data: null,
      };
    }
  }

  async bookTicketByOrder(order: number): Promise<IBaseOutput<null>> {
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
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "BookingPage.bookTicketByOrder",
        errorMessage,
      });

      return {
        errorMessage,
        data: null,
      };
    }
  }

  async bookTicket(): Promise<IBaseOutput<null>> {
    try {
      await this.click(this.buyTicketBtnLocator);

      return {
        data: null,
      };
    } catch (err) {
      const errorMessage = (err as Error)?.message;

      console.log({
        context: "BookingPage.bookTicket",
        errorMessage,
      });

      return {
        errorMessage,
        data: null,
      };
    }
  }
}
