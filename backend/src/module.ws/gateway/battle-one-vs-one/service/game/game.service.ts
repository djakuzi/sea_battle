import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ServiceGameSessions } from '../gameSession/gameSession.service';
import { Emit } from './core/emit';
import { Sub } from './core/sub';
import { GameOneVsOne } from 'src/game/typeGame/OneVsOne';
import { IntrInfoParticipants } from 'src/game/core/types/gameParticipants.interface';
import { IntrFullInfoShip } from 'src/common/types/ship/ship.interface';
import { getSession } from '../../../../../common/util/session/methods/getSession';
import { getEnemyParticipant } from '../../script/util/session/methods/getEnemyParticipant';
import { IntrSessionOneVsOne } from '../../types/session/session.interface';

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
		const session = getSession(this.serviceGameSessions.gameSessions, idSession);

		const game = session.game;
		let firstMove = game?.Move.getInfo('firstMoveParticipantId');

		if (!firstMove) {
			firstMove = game?.Move.determineFirstMove();
		}

		for (const key in session.session.participants) {
			const enemy = getEnemyParticipant(session.session, key);

			this.emit.gameStart(
				session.session.participants[key].client,
				enemy.data,
				firstMove as string,
			);

			game?.setListenner('Timer', 'onDelayUpdate', (
				time: number,
				minutes: string,
				seconds: string
			) => {
				this.emit.updateTime(
					session.session.participants[key].client,
					{
						time,
						minutes,
						seconds
					}
				);
			})

			game?.setListenner('Timer', 'onEnd', () => {
				this.emit.endTime(session.session.participants[key].client);
				game.Timer.updateDataTimer();
				game.Timer.setTimer();
			})
		}

		game?.startGame();

		console.log(`Игра началась в сессии с id: ${idSession}}. Первый ходит ${firstMove}.`);
	}

	async finishGame(
		session: IntrSessionOneVsOne,
		idWinner: string,
	): Promise<void> {
		
		session.session.endDate = new Date();
		session.session.idWinner = idWinner;
		session.game?.destroy();
		console.log(`Сессия игры с id ${session.session.id} окончена. Победитель игрок с id -  ${idWinner}`);
		
		this.serviceGameSessions.endSession(session);
	}

	async leaveParticipant(idParticipant: string, idSession: string) {
		const session = getSession(this.serviceGameSessions.gameSessions, idSession);
		const enemy = getEnemyParticipant(session.session, idParticipant);

		this.emit.enemyLeft(enemy.client);

		console.log(`Сессия игры с id ${idSession} прекращена. Игрок с id -  ${idParticipant} покинул игру`);

		session.game?.destroy();
		this.serviceGameSessions.deleteSession(session);
	}
}