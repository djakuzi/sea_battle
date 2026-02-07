import { getElementCoord } from "./methods/getElementCoord";
import { isNoCanShot } from "./methods/isShotedCoord";
import { setHit } from "./methods/setHit";
import { setKill } from "./methods/setKill";
import { setMiss } from "./methods/setMiss";
import { setPerimeter } from "./methods/setPerimeter";
import { showShip } from "./methods/showShip";

export const ModuleFieldBattle = {
	setMiss,
	setHit,
	setPerimeter,
	getElementCoord,
	setKill,
	showShip,
	isNoCanShot,
};