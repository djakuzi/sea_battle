import { IntrFullInfoShip} from "src/common/types/ship/ship.interface";
import { IntrInfoParticipants } from "src/game/core/types/gameParticipants.interface";
import { Procces } from "./script/Procces";
import { Status } from "./script/Status";
import { Move } from "./script/Move";
import { Timer } from "./script/Timer";
import { TypeTimerEventMap } from "./types/timer/gameTimer.type";
import { Statistic } from "./script/Statistic";
import { Config } from "./script/Config";
import { IntrConfig } from "./types/config/config.interface";

export class CoreGame {
	participants: Map<string, IntrInfoParticipants> = new Map();
	Procces: Procces;
	Status: Status;
	Move: Move;
	Timer: Timer;
	Statistic: Statistic;
	Config: Config;

	constructor(
		participants: IntrInfoParticipants[],
		fieldCoordShips: Record<string, IntrFullInfoShip[]>,
		config?: Partial<IntrConfig>,
	) {
		participants.forEach(el => {
			this.participants.set(el.id, el);
		})

		this.Procces = new Procces(this, fieldCoordShips);
		this.Status = new Status(this);
		this.Move = new Move(this);
		this.Timer = new Timer(this);
		this.Statistic = new Statistic(this, participants);
		this.Config = new Config(this, config);
	
		this.Move.determineFirstMove();

		this.Timer.listenner.onEnd(() => {
			this.Move.switchTurn();
		})
	}

	protected Core

	setListenner<T extends keyof TypeTimerEventMap>(
		controller: "Timer",
		method: T,
		callback: TypeTimerEventMap[T]
	): void {
		this[controller].listenner[method](callback as any);
	}

	destroy() {
		this.Timer.destoy();
	}
}