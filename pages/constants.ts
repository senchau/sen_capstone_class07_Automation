import { Locale } from "./types";
import { UserModel } from "../models/User2";

export const HOME_PAGE_DOMAIN = "https://demo1.cybersoft.edu.vn";
export const SIGN_IN_PAGE_DOMAIN = "https://demo1.cybersoft.edu.vn/sign-in";

const API_ENDPOINT = "https://movie0706.cybersoft.edu.vn/api";

export const MOVIE_LIST_API = `${API_ENDPOINT}/QuanLyPhim/LayDanhSachPhim?maNhom=GP09`;

export const MOVIE_DETAIL_API = `${API_ENDPOINT}/QuanLyRap/LayThongTinLichChieuPhim`;

export const SEAT_LIST_API = `${API_ENDPOINT}/QuanLyDatVe/LayDanhSachPhongVe`;

export const userTest = new UserModel({
  username: "janedoe01",
  password: "123456",
  email: "janedoe@gmail.com",
  userType: "Customer",
  firstName: "Jane",
  lastName: "Doe",
});

export const LANGUAGE: Record<Locale, Record<string, string>> = {
  vi: {
    mandatoryField: "Đây là trường bắt buộc !",
    passwordNotMatched: "Mật khẩu không khớp !",
    fullNameNotContainedNumber: "Họ và tên không chứa số !",
    passwordGreaterThan6Characters: "Mật khẩu phải có ít nhất 6 kí tự !",
    globalAccountErrorMessage: "Tài khoản đã tồn tại!",
    globalEmailErrorMessage: "Email đã tồn tại!",
    registerBtn: "Đăng ký",
    registerSuccessfullyMessage: "Đăng ký thành công",
    loginBtn: "Đăng nhập",
    loginSuccessfullyMessage: "Đăng nhập thành công",
    globalLoginErrorMessage: "Tài khoản hoặc mật khẩu không đúng!",
    logoutSuccessfullyMessage: "Đã đăng xuất",

    signInCtaBtn: "Đăng nhập",
    signInSuccessfullyMessage: "Đăng nhập thành công",

    bookingBuyTicketBtn: "ĐẶT VÉ",
    bookingBuyTNowicketBtn: "MUA VÉ NGAY",
    bookingUnauthenticatedMessage: "Bạn chưa đăng nhập",
    bookingUnselectSeatMessage: "Bạn chưa chọn ghế",
    bookingSuccessfullyMessage: "Đặt vé thành công",
  },
};
