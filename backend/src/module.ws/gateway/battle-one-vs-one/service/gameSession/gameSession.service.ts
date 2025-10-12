import { Injectable } from '@nestjs/common';
import { IntrWaitingParticipant } from '../../types/waitingParticipant.interface';
import { createSessionByUserId } from 'src/common/util/session/methods/createSessionByUserId';
import { IntrSessionOneVsOne } from '../../types/session/session.interface';
import { IntrFullInfoShip } from 'src/common/types/ship/ship.interface';
import { Emit } from './core/emit';
import { Sub } from './core/sub';
import { ServiceGame } from '../game/game.service';

@Injectable()
export class ServiceGameSessions {
	readonly emit: Emit = new Emit(this);
	readonly sub: Sub = new Sub(this);

	readonly gameSessions: Map<string, IntrSessionOneVsOne> = new Map();
	readonly dataShipCoord: Map<string, Record<string, IntrFullInfoShip[] | null>> = new Map();

	constructor(
		private readonly serviceGame: ServiceGame,
	) {}

	async createSession(participant1: IntrWaitingParticipant, participant2: IntrWaitingParticipant): Promise<IntrSessionOneVsOne> {
		const idSession = createSessionByUserId(participant1.data.id, participant2.data.id, 'gm');

		const session = {
			id: idSession,
			startDate: new Date(),
			endDate: null,
			participants: {
				[participant1.data.id]: participant1,
				[participant2.data.id]: participant2
			},
			idWinner: null,
		}

		const game = null;

		const gameSession = {
			session,
			game,
		}

		this.gameSessions.set(idSession, gameSession);
		this.sendSessionDataToParticipants(participant1, participant2, idSession);

		return gameSession;
	}

	async deleteSession(idSession:string):Promise<void> {
		this.gameSessions.delete(idSession);
	}

	sendSessionDataToParticipants(
		participant1: IntrWaitingParticipant,
		participant2: IntrWaitingParticipant,
		idSession: string,
	): void {
		this.dataShipCoord.set(idSession, {
			[participant1.data.id]: null,
			[participant2.data.id]: null,
		})

		this.emit.sessionCreated(participant1.client, idSession);
		this.emit.sessionCreated(participant2.client, idSession);

		console.log(`Отправлена сессия игры: ${idSession} для игроков ${participant1.data.id} и ${participant2.data.id}`);
	}

	async checkDataShipParticipants(
		idSession: string,
	) {
		const gameSession = this.gameSessions.get(idSession);

		if (!gameSession) {
			throw new Error(`Session with ID ${idSession} not found`);
		}

		const mapDataShips = this.dataShipCoord.get(idSession);

		if (!mapDataShips) {
			throw new Error(`No ship data found for session with ID ${idSession}`);
		}

		const participantsIds = Object.keys(mapDataShips);

		if (participantsIds.length !== 2) {
			return;
		}

		const idParticipants1 = participantsIds[0];
		const idParticipants2 = participantsIds[1];

		const mapDataShipsParticipants1 = mapDataShips[idParticipants1];
		const mapDataShipsParticipants2 = mapDataShips[idParticipants2];

		if (!Array.isArray(mapDataShipsParticipants1) || !Array.isArray(mapDataShipsParticipants2)) {
			return;
		}

		if (mapDataShipsParticipants1.length === 0 || mapDataShipsParticipants2.length === 0) {
			return;
		}

		const game = await this.serviceGame.createGame(
			[
				{ id: String(idParticipants1) },
				{ id: String(idParticipants2) }
			],
			{
				[idParticipants1]: mapDataShipsParticipants1,
				[idParticipants2]: mapDataShipsParticipants2,
			}		
		)

		gameSession.game = game;

		this.gameSessions.set(idSession, gameSession);
		this.dataShipCoord.delete(idSession);

		this.serviceGame.startGame(idSession);
	}	
}
