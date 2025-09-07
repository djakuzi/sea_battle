export enum EnumVariantPlayType {
    Bot = 'bot',
    Online = 'online',
    Tournament = 'tournament',
    Invite = 'invite',
}

export interface IntrBatteleVariant {
    type: EnumVariantPlayType,
    title: string,
}