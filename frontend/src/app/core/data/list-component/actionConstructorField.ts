import ICONSave from '../../../../assets/icons/game/constructor/save-red.png';
import ICONRandom from '../../../../assets/icons/game/constructor/random.png';
import ICONListSave from '../../../../assets/icons/game/constructor/list-save.png';
import ICONReset from '../../../../assets/icons/game/constructor/reset.png';
import { EnumActionConstructorFieldName, IntrListActionConstructorField } from './interfaces/actionConstructorField';

export const LIST_ACTION_CONSTRUCTOR_FIELD: IntrListActionConstructorField[] = [
    {
        name: EnumActionConstructorFieldName.Save,
        icon: ICONSave,
        desc: 'сохранить',
        children: '',
    },
    {
        name: EnumActionConstructorFieldName.ListSave,
        icon: ICONListSave,
        desc: 'Cписок сохранений',
        children: '',
    },
    {
        name: EnumActionConstructorFieldName.Random,
        icon: ICONRandom,
        desc: 'Расставить корабли в случайном порядке',
        children: '',
    },
    {
        name: EnumActionConstructorFieldName.Reset,
        icon: ICONReset,
        desc: 'Сбросить расположение кораблей',
        children: '',
    },
];