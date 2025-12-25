import { TLocale } from "../types/locale";

export const LANGUAGE: Record<TLocale, Record<string, string>> = {
  VI: {
    PASSWORD_NOT_MATCHED: "Mật khẩu không khớp !",
    FULL_NAME_NOT_CONTAINED_NUMBER: "Họ và tên không chứa số !",
    GLOBAL_ACCOUNT_ERROR_MESSAGE: "Tài khoản đã tồn tại!",
    GLOBAL_EMAIL_ERROR_MESSAGE: "Email đã tồn tại!",
    REGISTER_BTN: "Đăng ký",
    REGISTER_SUCCESSFULLY_MESSAGE: "Đăng ký thành công",
    LOGIN_BTN: "Đăng nhập",
    LOGIN_SUCCESSFULLY_MESSAGE: "Đăng nhập thành công",
    GLOBAL_LOGIN_ERROR_MESSAGE: "Tài khoản hoặc mật khẩu không đúng!",
    LOGOUT_SUCCESSFULLY_MESSAGE: "Đã đăng xuất",

    HEADER_SIGN_OUT_CTA_BTN: "Đăng xuất",
    HEADER_SIGN_OUT_SUCCESSFULLY_MESSAGE: "Đã đăng xuất",

    SIGN_UP_CTA_BTN: "Đăng ký",
    SIGN_UP_SUCCESSFULLY_MESSAGE: "Đăng ký thành công",

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
