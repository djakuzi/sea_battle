import { IntrWidthShip } from "@app-common/types/Ship.interface";

/**
 * Функция получения размеров кораблей в ширину
 * @param width
 * @returns IntrWidthShip
 */
export function getWidthShip(width: number): IntrWidthShip {
  const objWidthRect = {
	one: width,
	two: width * 2,
	three: width * 3,
	four: width * 4,
  };

  return objWidthRect;
}