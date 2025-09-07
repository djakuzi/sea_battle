

/**
 * @description - Настройки кораблей
 * @param {number} size - размер корабля по клеткам
 * @param {number} count - количество кораблей с таким размером
 */
export interface IntrInfoShips { 
    size: number;
    count: number;
};

/**
 * @description - Настройки кораблей
 * @param {number} quantityShips - количество кораблей на поле
 * @param {number} infoShips - информация о самих корабля
 */
export interface IntrConfigShips {
    quantityShips: number
    infoShips: IntrInfoShips[];
}