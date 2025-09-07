export enum EnumProfileList {
    Profile = 'profile',
    Friends = 'friends',
    Statistic = 'statistic',
    ListBattle = 'list-battle',
    Exit = 'exit'
}

export interface IntrListProfileMenu {
    title: string,
    name: EnumProfileList,
}