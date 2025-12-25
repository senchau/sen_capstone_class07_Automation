import { TLocale } from "../types/locale";

export const LANGUAGE: Record<TLocale, Record<string, string>> = {
  VI: {
    HEADER_SIGN_OUT_CTA_BTN: "Đăng xuất",
    HEADER_SIGN_OUT_SUCCESSFULLY_MESSAGE: "Đã đăng xuất",

    SIGN_UP_CTA_BTN: "Đăng ký",
    SIGN_UP_SUCCESSFULLY_MESSAGE: "Đăng ký thành công",
    SIGN_UP_MANDATORY_FIELD: "Đây là trường bắt buộc !",
    SIGN_UP_PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCH: "Mật khẩu không khớp !",
    SIGN_UP_PASSWORD_GREATER_THAN_6_CHARACTERS:
      "Mật khẩu phải có ít nhất 6 kí tự !",
    SIGN_UP_NAME_MUST_NOT_INCLUDE_DIGIT: "Họ và tên không chứa số !",
    SIGN_UP_USERNAME_ALREADY_EXISTS: "Tài khoản đã tồn tại!",
    SIGN_UP_EMAIL_ALREADY_EXISTS: "Email đã tồn tại!",

    SIGN_IN_CTA_BTN: "Đăng nhập",
    SIGN_IN_SUCCESSFULLY_MESSAGE: "Đăng nhập thành công",
    SIGN_IN_MANDATORY_FIELD: "Đây là trường bắt buộc !",
    SIGN_IN_PASSWORD_GREATER_THAN_6_CHARACTERS:
      "Mật khẩu phải có ít nhất 6 kí tự !",
    SIGN_IN_ACCOUNT_ERROR: "Tài khoản hoặc mật khẩu không đúng!",

    BOOKING_BUY_TICKET_BTN: "ĐẶT VÉ",
    BOOKING_BUY_TICKET_NOW_BTN: "MUA VÉ NGAY",
    BOOKING_UNAUTHENTICATED_MESSAGE: "Bạn chưa đăng nhập",
    BOOKING_UNSELECT_SEAT_MESSAGE: "Bạn chưa chọn ghế",
    BOOKING_SUCCESSFULLY_MESSAGE: "Đặt vé thành công",
  },
};
