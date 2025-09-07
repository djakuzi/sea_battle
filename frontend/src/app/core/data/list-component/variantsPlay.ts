import { EnumVariantPlayType, IntrBatteleVariant } from "./interfaces/variantsPlay.interface";

export const LIST_VARIANT_PLAY: IntrBatteleVariant[] = [
    {
        type: EnumVariantPlayType.Bot,
        title: 'С БОТОМ',
    },
    {
        type: EnumVariantPlayType.Online,
        title: 'ОНЛАЙН',
    },
    {
        type: EnumVariantPlayType.Tournament,
        title: 'ТУРНИР',
    },
    {
        type: EnumVariantPlayType.Invite,
        title: 'ПО ПРИГЛАШЕНИЮ',
    },
];