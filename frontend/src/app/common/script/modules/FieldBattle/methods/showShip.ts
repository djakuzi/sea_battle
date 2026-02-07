import { IntrFullCoordPuttingShip } from "@app-common/types/Ship.interface";
import { getElementCoord } from "./getElementCoord";

export function showShip(dataShip: IntrFullCoordPuttingShip, fieldCoord: HTMLDivElement): void {
	const port = fieldCoord.querySelector<HTMLDivElement>('[data-port]');
	const { plane, size } = dataShip.ship;
	const coords = dataShip.coords;
	const ship = port?.querySelector<HTMLDivElement>(`[data-ship-size="${size}"]`);
	const elCoord = getElementCoord(coords[0], fieldCoord);

	if (!ship || !elCoord) {
		console.error('Ship or coord not founded');
		return;
	}

	const { offsetTop, offsetLeft } = elCoord;

	ship.style.position = 'absolute';
	ship.style.top = offsetTop + 'px';
	ship.style.left = offsetLeft + 'px';

	ship.dataset.plane = plane;
	fieldCoord?.appendChild(ship);
}