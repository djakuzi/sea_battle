/**
 * Модификаторы-классы подсвечивания координат поля
 * @param highlight - коорды на которые можно поставить корабль
 * @param perimeter - коорды периметра поставленного корабля
 * @param putting - коорды на которые поставлен корабль
 * @param miss - коорды по которым был промах при выстреле
 * @param hit - коорды попадания по кораблю
 * @param kill - коорды убитого корабля
 */
export enum EnumClasssesCoord {
    highlight = '--coord-highlight',
    perimeter ='--coord-perimeter',
    putting ='--coord-putting',
    miss = '--coord-miss',
    hit ='--coord-hit',
    kill = '--coord-kill',
};

/**
 * @description - Настройки поля координат
 * @param {ClasssesCoord} classesCoord - классы модификаторы координат
 * @param {number} sizeField - количество клетоп поля по X и Y
 */
export interface IntrConfigField {
    classesCoord: Record<string, EnumClasssesCoord>;
    sizeField: number;
}


  