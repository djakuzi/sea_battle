import { IntrCoord } from "@app-common/types/Ship.interface";
import { CONFIG_FIELD } from "@app-core/settings/fieldCoord.settings";
import { getElementCoord } from "./getElementCoord";

export function setKill(coords: IntrCoord[], fieldCoord: HTMLDivElement): void {
	const { kill: classKill } = CONFIG_FIELD.classesCoord;
	const { hit: classHit } = CONFIG_FIELD.classesCoord;

	coords.forEach((coord: IntrCoord) => {
		const elCoord = getElementCoord(coord, fieldCoord);

		if (!elCoord) return;

		elCoord.classList.remove(classHit);
		elCoord.classList.add(classKill);
	});
}