/** EnumVariantPlayType
 * Тип битвы:
 *  - 'BOT' - с ботом;
 *  - 'ONLINE' - обычная онлайн битва;
 *  - 'TOURNAMENT' - турнир;
 *  - 'INVITE' - битва по приглашению.
*/
export enum EnumVariantPlayType {
	BOT = 'bot',
	ONE_VS_ONE = 'one-vs-one',
	TOURNAMENT = 'tournament',
	INVITE = 'invite'
}

export interface IntrBattleVariant {
    type: EnumVariantPlayType,
    title: string,
}