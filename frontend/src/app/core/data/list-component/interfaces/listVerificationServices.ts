export enum EnumVerificationServiceName {
    Google = 'google',
    Vkontakte = 'vkontakte',
    Telegram = 'telegram',
    Yandex = 'yandex',
}

export interface IntrListVerificationServices {
    name: string,
    icon: string,
}