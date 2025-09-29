
import { TypeListJsxElement } from "../../../common/script/hooks/ui/useListJSXelement";
import { ModalListSpacedShips } from "../modal/ModalListSpacedShips/ModalListSpacedShips";

export enum EnumConstructorModals {
    ListSaveCoordsShips = 'listSaveCoordsShips'
}

export const LIST_CONSTRUCTOR_MODALS: TypeListJsxElement<EnumConstructorModals> = {
    [EnumConstructorModals.ListSaveCoordsShips]: <ModalListSpacedShips />
}