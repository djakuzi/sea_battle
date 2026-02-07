import { IntrCoordPuttingShip, IntrFullDataShipBattle, IntrCoord } from "@app-common/types/Ship.interface";

/**
 * Функция, которая преобразует первые и последние координаты кораблей в полные координаты
 * @param coordPuttingShips
 * @returns IntrFullCoordPuttingShip[]
 */
export function transformationToFullCoordShips(coordPuttingShips: IntrCoordPuttingShip[]): IntrFullDataShipBattle[] {
  const result: IntrFullDataShipBattle[] = [];

  coordPuttingShips.forEach((data) => {
	const { index, size, plane } = data.ship;
	const isPlane = plane == 'horizontal' ? true : false;

	const obj: IntrFullDataShipBattle = {
	  ship: {
		index: index,
		size: size,
		plane: plane,
	  },
	  coords: [],
	  countHit: 0,
	  isKill: false,
	};

	const fullCoord: IntrCoord[] = [];

	for (let i = 0; i < size; i++) {
	  const objCoord = {
		x: 0,
		y: 0,
	  };

	  if (isPlane) {
		objCoord.y = data.firstCoord.y;
		objCoord.x = data.firstCoord.x + i;
	  } else {
		objCoord.x = data.firstCoord.x;
		objCoord.y = data.firstCoord.y + i;
	  }

	  fullCoord.push(objCoord);
	}

	obj.coords = fullCoord;

	result.push(obj);
  });

  return result;
}