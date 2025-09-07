import { EnumClasssesCoord, IntrConfigField } from "./types/fieldCoord.interface";


const classesCoord: Record<string, EnumClasssesCoord> = {
    highlight: EnumClasssesCoord.highlight,
    perimeter: EnumClasssesCoord.perimeter,
    putting: EnumClasssesCoord.putting,
    miss: EnumClasssesCoord.miss,
    hit: EnumClasssesCoord.hit,
    kill: EnumClasssesCoord.kill,
};

const sizeField: number = 10;


export const CONFIG_FIELD: IntrConfigField = {
    classesCoord,
    sizeField
};


