import { IntrCoordPuttingShip } from "@app-common/types/Ship.interface";
import { EnumParticipant } from "@app-layouts/Battle/types/battle.enum";
import { PayloadAction } from "@reduxjs/toolkit";

/** setCoordPuttingShips - установить данные координат участнику битвы.
 * @param {object} action
 * @property {TypePlayers} typePlayers
 * @property {IntrCoordPuttingShip[]} coordPuttingShips
 */
export function setCoordPuttingShips(
	state,
	action: PayloadAction<{
		typePlayers: EnumParticipant;
		coordPuttingShips: IntrCoordPuttingShip[];
	}>,
) {
	const { typePlayers, coordPuttingShips } = action.payload;
	state[typePlayers]!.coordPuttingShips = coordPuttingShips;
};