import ICONgoogle from '../../../../assets/icons/services/google.svg';
import ICONvkontakte from '../../../../assets/icons/services/vkontarte.svg';
import ICONtelegram from '../../../../assets/icons/services/telegram.svg';
import ICONyandex from '../../../../assets/icons/services/yandex.svg';
import { EnumVerificationServiceName, IntrListVerificationServices } from './interfaces/listVerificationServices';

export const LIST_VERIFICATION_SERVICES: IntrListVerificationServices[] = [
    {
        name: EnumVerificationServiceName.Google,
        icon: ICONgoogle,
    },
    {
        name: EnumVerificationServiceName.Vkontakte,
        icon: ICONvkontakte,
    },
    {
        name: EnumVerificationServiceName.Telegram,
        icon: ICONtelegram,
    },
    {
        name: EnumVerificationServiceName.Yandex,
        icon: ICONyandex,
    },
];