import { IntrCoord } from "@app-common/types/Ship.interface";

export function getElementCoord(coord: IntrCoord, fieldCoord: HTMLDivElement, numX = 0, numY = 0): HTMLDivElement | null {
	const { x, y } = coord;

	const elCoord = fieldCoord.querySelector<HTMLDivElement>(`[data-coord-x="${+x + numX}"][data-coord-y="${+y + numY}"]`);

	return elCoord;
}
