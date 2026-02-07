import { IntrCoord } from "@app-common/types/Ship.interface";
import { CONFIG_FIELD } from "@app-core/settings/fieldCoord.settings";
import { getElementCoord } from "./getElementCoord";

export function setHit(coord: IntrCoord, fieldCoord: HTMLDivElement): void {
	const { hit: classHit } = CONFIG_FIELD.classesCoord;
	const elCoord = getElementCoord(coord, fieldCoord);

	if (!elCoord) {
		return;
	}

	elCoord.classList.add(classHit);
}