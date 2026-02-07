import { CONFIG_FIELD } from "@app-core/settings/fieldCoord.settings";

export function isNoCanShot(coord: HTMLDivElement): boolean {
	const isKill = coord.classList.contains(CONFIG_FIELD.classesCoord.kill);
	const isMiss = coord.classList.contains(CONFIG_FIELD.classesCoord.miss);
	const isPerimenter = coord.classList.contains(CONFIG_FIELD.classesCoord.perimeter);
	const isHit = coord.classList.contains(CONFIG_FIELD.classesCoord.hit);

	return isKill || isMiss || isPerimenter || isHit;
}