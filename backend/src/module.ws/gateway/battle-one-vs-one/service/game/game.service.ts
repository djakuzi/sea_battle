import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ServiceGameSessions } from '../gameSession/gameSession.service';
import { Emit } from './core/emit';
import { Sub } from './core/sub';
import { GameOneVsOne } from 'src/game/typeGame/OneVsOne';
import { IntrInfoParticipants } from 'src/game/core/types/gameParticipants.interface';
import { IntrFullInfoShip } from 'src/common/types/ship/ship.interface';
import { getSession } from '../../../../../common/util/session/methods/getSession';

@Injectable()
export class ServiceGame {
	readonly emit: Emit = new Emit(this);
	readonly sub: Sub = new Sub(this);

	constructor(
		@Inject(forwardRef(() => ServiceGameSessions))
		readonly serviceGameSessions: ServiceGameSessions,
	) { }

	async createGame(
		participants: IntrInfoParticipants[],
		fieldCoordShips: Record<string, IntrFullInfoShip[]>
	): Promise<GameOneVsOne> {
		return new GameOneVsOne(participants, fieldCoordShips)
	}

	async startGame(
		idSession: string,
	): Promise<void> {
		const gameSession = getSession(this.serviceGameSessions.gameSessions, idSession);

		const game = gameSession.game;
		let firstMove = game?.Move.getInfo('firstMoveParticipantId');

		if (!firstMove) {
			firstMove = game?.Move.determineFirstMove();
		}

		for (const key in gameSession.session.participants) {
			const participant = gameSession.session.participants[key];

			this.emit.gameStart(
				participant.client,
				participant.data,
				firstMove as string,
			)
		}
	}

	async finishGame(
		idSession: string,
		idWinner: string,
	): Promise<void> {
		const session = getSession(this.serviceGameSessions.gameSessions, idSession);

		session.session.endDate = new Date();
		session.session.idWinner = idWinner;

		console.log(`Сессия игры с id ${idSession} окончена. Победитель игрок с id -  ${idWinner}`);

		this.serviceGameSessions.deleteSession(idSession);
	}
}