import { ServiceGameSessions } from "../gameSession.service";
import { IntrFullInfoShip } from "src/common/types/ship/ship.interface";

export class Sub {
	private core: ServiceGameSessions;

	constructor(core: ServiceGameSessions) {
		this.core = core;
	}

	async sendShipData(
		playerId: string,
		dataShips: IntrFullInfoShip[],
		idSession: string,
	): Promise<void> {
		const core = this.core;

		const gameSession = core.gameSessions.get(idSession);

		if (!gameSession) {
			throw new Error(`Session with ID ${idSession} not found`);
		}

		let mapDataShips = core.dataShipCoord.get(idSession);
		let checkedShipForStartGame: boolean = false;

		if (mapDataShips) {
			mapDataShips[playerId] = dataShips;
			checkedShipForStartGame = true;
		} else {
			mapDataShips = {
				[playerId]: dataShips,
			};

			core.dataShipCoord.set(idSession, mapDataShips);
		}

		if (checkedShipForStartGame) {
			await this.core.checkDataShipParticipants(idSession);
		}
	}
}