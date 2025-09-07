import { IntrConfigShips, IntrInfoShips } from "./types/ships.interface";

const quantityShips: number = 10;

const infoShips: IntrInfoShips[] = [
    { size: 4, count: 1 },
    { size: 3, count: 2 },
    { size: 2, count: 3 },
    { size: 1, count: 4 },
];

export const CONFIG_SHIPS: IntrConfigShips = {
    quantityShips,
    infoShips
};