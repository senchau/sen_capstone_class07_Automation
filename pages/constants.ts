type Locale = 'vi'

const ErrorMessages: Record<Locale, Record<string, string>> = {
    vi: {
        emailDuplicated: 'Email đã tồn tại!'
    }
}


export const LocaleErrors = ErrorMessages['vi']