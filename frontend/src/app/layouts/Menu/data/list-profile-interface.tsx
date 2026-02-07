
import { TypeListJsxElement } from "../../../common/script/hooks/ui/useListJSXelement";
import { EnumProfileList } from "../../../core/data/list-component/interfaces/profileMenu.interface";
import ModalFriends from "../screens/ScreenProfile/modal/ModalFriends/ModalFriends";
import ModalListBattle from "../screens/ScreenProfile/modal/ModalListBattle/ModalListBattle";
import ModalProfile from "../screens/ScreenProfile/modal/ModalProfile/ModalProfile";
import ModalStatistic from "../screens/ScreenProfile/modal/ModalStatistic/ModalStatistic";

export const PROFILE_COMPONENTS: TypeListJsxElement<EnumProfileList> = {
    [EnumProfileList.Profile]: <ModalProfile />,
    [EnumProfileList.Friends]: <ModalFriends />,
    [EnumProfileList.ListBattle]: <ModalListBattle />,
    [EnumProfileList.Statistic]: <ModalStatistic />,
    [EnumProfileList.Exit]: <ModalFriends />,
};