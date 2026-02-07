import { EnumVariantPlayType, IntrBattleVariant } from "./interfaces/variantsPlay.interface";

export const LIST_VARIANT_PLAY: IntrBattleVariant[] = [
    {
        type: EnumVariantPlayType.BOT,
        title: 'С БОТОМ',
    },
    {
        type: EnumVariantPlayType.ONE_VS_ONE,
        title: 'ОНЛАЙН',
    },
    {
        type: EnumVariantPlayType.TOURNAMENT,
        title: 'ТУРНИР',
    },
    {
        type: EnumVariantPlayType.INVITE,
        title: 'ПО ПРИГЛАШЕНИЮ',
    },
];