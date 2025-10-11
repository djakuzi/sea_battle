import { IntrFullInfoShip, IntrShipCoord } from "src/common/types/ship/ship.interface";
import { IntrInfoParticipants } from "src/game/core/types/gameParticipants.interface";
import { IntrDataShot } from "src/game/core/types/gameShot.interface";
import { Procces } from "./script/Procces";
import { Status } from "./script/Status";
import { Move } from "./script/Move";
import { EnumStatusGame } from "./types/game.enum";

export class CoreGame {
	participants: Map<string, IntrInfoParticipants> = new Map();
	Procces: Procces;
	Status: Status;
	Move: Move;

	constructor(
		participants: IntrInfoParticipants[],
		fieldCoordShips: Record<string, IntrFullInfoShip[]>
	) {
		participants.forEach(el => {
			this.participants.set(el.id, el);
		})

		this.Procces = new Procces(this, fieldCoordShips);
		this.Status = new Status(this);
		this.Move = new Move(this);

		this.Move.determineFirstMove();
	}

	shotToCoord(
		idParticipant: string,
		coordsShot: IntrShipCoord,
	): IntrDataShot {
		if (!this.Status.isStatus(EnumStatusGame.GAME)) {
			throw new Error('Игра на паузе');
		}

		if (!this.Move.isPlayerTurn(idParticipant)) {
			throw new Error('Не ваш ход!');
		}

		return this.Procces.shotToCoord(coordsShot, idParticipant);
	}
}