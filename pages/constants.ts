import { Locale } from './types'

export const HOME_PAGE_DOMAIN = 'https://demo1.cybersoft.edu.vn'

export const LANGUAGE: Record<Locale, Record<string, string>> = {
    vi: {
        mandatoryField: 'Đây là trường bắt buộc !',
        passwordNotMatched: 'Mật khẩu không khớp !',
        fullNameNotContainedNumber: 'Họ và tên không chứa số !',
        passwordGreaterThan6Characters: 'Mật khẩu phải có ít nhất 6 kí tự !',
        globalAccountErrorMessage: 'Tài khoản đã tồn tại!',
        globalEmailErrorMessage: 'Email đã tồn tại!',
        registerBtn: 'Đăng ký',
        registerSuccessfullyMessage: 'Đăng ký thành công',
        loginBtn: 'Đăng nhập',
        loginSuccessfullyMessage: 'Đăng nhập thành công',
        globalLoginErrorMessage: 'Tài khoản hoặc mật khẩu không đúng!',
        logoutSuccessfullyMessage: 'Đã đăng xuất'
    }
}
