import { CoreGame } from "../coreGame";
import { EnumStatusGame } from "../types/game.enum";

export class Status {
	private core: CoreGame;

	private statusGame: EnumStatusGame = EnumStatusGame.NONE;
	constructor(core: CoreGame) {
		this.core = core;
	}

	start = () => {
		if (this.statusGame == EnumStatusGame.FINISHED) {
			throw new Error('Игра уже окончена');
		}

		this.statusGame = EnumStatusGame.GAME;
	}

	pause = () => {
		if (this.statusGame == EnumStatusGame.FINISHED) {
			throw new Error('Игра уже окончена');
		}

		this.statusGame = EnumStatusGame.PAUSE;
	}

	finished = () => {
		if (this.statusGame == EnumStatusGame.FINISHED) {
			throw new Error('Игра уже окончена');
		}
		
		this.statusGame = EnumStatusGame.FINISHED;
	}

	isStatus = (status: EnumStatusGame):boolean => {
		return status === this.statusGame;
	}
}