import { IntrCoord } from "@app-common/types/Ship.interface";
import { CONFIG_FIELD } from "@app-core/settings/fieldCoord.settings";
import { getElementCoord } from "./getElementCoord";

export function setMiss(coord: IntrCoord, fieldCoord: HTMLDivElement): void {
	const { miss: classMiss } = CONFIG_FIELD.classesCoord;
	const elCoord = getElementCoord(coord, fieldCoord);

	if (!elCoord) {
		return;
	}

	elCoord.classList.add(classMiss);
}