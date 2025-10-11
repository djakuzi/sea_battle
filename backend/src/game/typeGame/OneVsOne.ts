import { IntrFullInfoShip } from "src/common/types/ship/ship.interface";
import { CoreGame } from "../core/coreGame"
import { IntrInfoParticipants } from "../core/types/gameParticipants.interface";

export class GameOneVsOne extends CoreGame {
	constructor(
		participants: IntrInfoParticipants[],
		fieldCoordShips: Record<string, IntrFullInfoShip[]>
	) {
		super(
			participants,
			fieldCoordShips
		);
	}
}