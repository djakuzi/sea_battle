import { EnumProfileList, IntrListProfileMenu } from "./interfaces/profileMenu.interface";

export const LIST_PROFILE_MENU: IntrListProfileMenu[] = [
    {
        title: 'профиль',
        name: EnumProfileList.Profile,
    },
    {
        title: 'друзья',
        name: EnumProfileList.Friends,
    },
    {
        title: 'статистика',
        name: EnumProfileList.Statistic,
    },
    {
        title: 'список боев',
        name: EnumProfileList.ListBattle,
    },
    {
        title: 'выйти',
        name: EnumProfileList.Exit,
    },
  ];