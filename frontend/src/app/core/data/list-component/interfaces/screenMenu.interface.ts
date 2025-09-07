export enum EnumScreenName {
    Profile = 'profile',
    Menu = 'menu',
    Settings = 'settings',
}

export interface IntrScreenItem {
    name: EnumScreenName,
    icon: string,
}