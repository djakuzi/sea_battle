import { IntrCoord } from "@app-common/types/Ship.interface";
import { TypePlaneShip } from "@app-common/types/Ship.type";
import { CONFIG_FIELD } from "@app-core/settings/fieldCoord.settings";
import { getElementCoord } from "./getElementCoord";

export function setPerimeter(plane: TypePlaneShip, coords: IntrCoord[], fieldCoord: HTMLDivElement): void {
	const { perimeter: classPerimeter } = CONFIG_FIELD.classesCoord;
	const { miss: classMiss } = CONFIG_FIELD.classesCoord;
	const isHorizontal = plane == 'horizontal';

	function addPerimeter(elCoord: HTMLDivElement | null): void {
		if (!elCoord) return;

		elCoord.classList.remove(classMiss);
		elCoord.classList.add(classPerimeter);
	}

	type TypeElCoord = HTMLDivElement | null;

	coords.forEach((coord: IntrCoord, index: number, arr) => {
		const mainCoord = getElementCoord(coord, fieldCoord);

		const isBow = index === 0;
		const isStern = index === arr.length - 1;

		let coordCenterBow: TypeElCoord = null;
		let coordLeftBow: TypeElCoord = null;
		let coordRightBow: TypeElCoord = null;

		let coordCenterStern: TypeElCoord = null;
		let coordLeftStern: TypeElCoord = null;
		let coordRightStern: TypeElCoord = null;

		let leftBoard: TypeElCoord = null;
		let rightBoard: TypeElCoord = null;

		if (isHorizontal) {
			leftBoard = getElementCoord(coord, fieldCoord, 0, -1);
			rightBoard = getElementCoord(coord, fieldCoord, 0, 1);

			if (isBow) {
				coordCenterBow = getElementCoord(coord, fieldCoord, -1, 0);
				coordLeftBow = getElementCoord(coord, fieldCoord, -1, 1);
				coordRightBow = getElementCoord(coord, fieldCoord, -1, -1);
			}

			if (isStern) {
				coordCenterStern = getElementCoord(coord, fieldCoord, 1, 0);
				coordLeftStern = getElementCoord(coord, fieldCoord, 1, 1);
				coordRightStern = getElementCoord(coord, fieldCoord, 1, -1);
			}
		} else {
			leftBoard = getElementCoord(coord, fieldCoord, -1, 0);
			rightBoard = getElementCoord(coord, fieldCoord, 1, 0);

			if (isBow) {
				coordCenterBow = getElementCoord(coord, fieldCoord, 0, -1);
				coordLeftBow = getElementCoord(coord, fieldCoord, -1, -1);
				coordRightBow = getElementCoord(coord, fieldCoord, 1, -1);
			}

			if (isStern) {
				coordCenterStern = getElementCoord(coord, fieldCoord, 0, 1);
				coordLeftStern = getElementCoord(coord, fieldCoord, -1, 1);
				coordRightStern = getElementCoord(coord, fieldCoord, 1, 1);
			}
		}

		addPerimeter(mainCoord);
		addPerimeter(leftBoard);
		addPerimeter(rightBoard);
		addPerimeter(coordCenterBow);
		addPerimeter(coordLeftBow);
		addPerimeter(coordRightBow);
		addPerimeter(coordCenterStern);
		addPerimeter(coordLeftStern);
		addPerimeter(coordRightStern);
	});
}