import { Locator } from "@playwright/test";
import { SeatModel } from "../models/Seat";

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

export interface IGetSeatListReq {
  isBooked?: boolean;
}

export interface IGetSeatListResp {
  seats: SeatModel[];
  total: number;
}

export interface ISelectSeatByOrderResp {
  locator: Locator;
}
