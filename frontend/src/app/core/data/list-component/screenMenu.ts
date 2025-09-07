import LOGOMenu from '../../../../assets/icons/game/screens/menu.tab.svg';
import LOGOProfile from '../../../../assets/icons/game/screens/profile.tab.svg';
import LOGOSettings from '../../../../assets/icons/game/screens/settings.tab.svg';
import { EnumScreenName, IntrScreenItem } from './interfaces/screenMenu.interface';

export const LIST_TOGGLE_MAIN_SCREEN_MENU: IntrScreenItem[] = [
    {
        name: EnumScreenName.Profile,
        icon: LOGOProfile,
    },
    {
        name: EnumScreenName.Menu,
        icon: LOGOMenu,
    },
    {
        name: EnumScreenName.Settings,
        icon: LOGOSettings,
    },
];