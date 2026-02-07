import { Socket } from "socket.io"
import { ServiceGame } from "../game.service";
import { IntrResultDataShot } from "src/game/core/types/gameShot.interface";
import { TypePlayerType } from "src/common/types/player/typePlayer.type";
import { IntrUpdateTime } from "../../../types/game/timer.interface";
import { IntrWinner } from "../../../types/game/winner.interface";

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
			type: TypePlayerType,
		}, 
		firstMove: string,
	): Promise<void> {
		client.emit('gameStart', {
			enemy: enemy,
			firstMove: firstMove,
		});
	}

	async updateTime(
		client: Socket,
		time: IntrUpdateTime,
	): Promise<void> {
		client.emit('updateTime', time);
	}

	async endTime(
		client: Socket,
	): Promise<void> {
		client.emit('endTime');
	}

	async myShot(
		client: Socket, 
		resultShot: IntrResultDataShot,
		moveParticipant: string,
	): Promise<void> {
		client.emit('myShot', {
			resultShot: resultShot,
			moveParticipant: moveParticipant
		});
	}

	async shotAtMe(
		client: Socket,
		resultShot: IntrResultDataShot,
		moveParticipant: string,
	): Promise<void> {
		client.emit('shotAtMe', {
			resultShot: resultShot,
			moveParticipant: moveParticipant
		});
	}

	async winner(
		client: Socket,
		data: IntrWinner
	): Promise<void> {
		client.emit('winner', data);
	}

	async enemyLeft(
		client: Socket,
	): Promise<void> {
		client.emit('enemyLeft');
	}
}