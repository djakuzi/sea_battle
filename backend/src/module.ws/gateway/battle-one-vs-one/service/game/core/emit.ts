import { Socket } from "socket.io"
import { ServiceGame } from "../game.service";
import { TypePlayerType } from "src/common/types/player/typePlayer.type";
import { IntrDataShot } from "src/game/core/types/gameShot.interface";

export class Emit {
	private core: ServiceGame;

	constructor(core: ServiceGame) {
		this.core = core;
	}

	async gameStart(
		client: Socket, 
		enemy: {
			id: string;
			nickname: string;
			experience: number;
			type: TypePlayerType;
		}, 
		firstMove: string,
	): Promise<void> {
		client.emit('gameStart', {
			enemy: enemy,
			firstMove: firstMove,
		});
	}

	async myShot(
		client: Socket, 
		resultShot: IntrDataShot,
	): Promise<void> {
		client.emit('myShot', {
			resultShot: resultShot
		});
	}

	async shotAtMe(
		client: Socket,
		resultShot: IntrDataShot,
	): Promise<void> {
		client.emit('shotAtMe', {
			resultShot: resultShot
		});
	}

	async winner(
		client: Socket,
		playerId: string,
	): Promise<void> {
		client.emit('winner', {
			idWinner: playerId,
		});
	}
}