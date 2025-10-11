import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { IntrWaitingParticipant } from '../../types/waitingParticipant.interface';
import { ServicePlayerGet } from 'src/module.api/player/service/playerGet.service';
import { ExceptionPlayerByUserNotFound } from 'src/common/util/error/methods/notFoundPlayerByUser';
import { Role } from 'src/common/types/role';
import { ServiceGameSessions } from '../gameSession/gameSession.service';
@Injectable()
export class ServiceQueue {
	private readonly waitingParticipants: Map<string, IntrWaitingParticipant> = new Map();

	constructor(
		private readonly servicePlayerGet: ServicePlayerGet,
		private readonly serviceGameSession: ServiceGameSessions,
	) { }

	async addPlayerToQueue(
		client: Socket,
		playerId: string,
	): Promise<void> {
		const resultParticipant = await this.servicePlayerGet.get(
			ServicePlayerGet.strategyName.GUEST_OR_PLAYER,
			{
				id: playerId,
			}
		)

		if (!resultParticipant?.player?.id && resultParticipant.type == Role.PLAYER) {
			throw new ExceptionPlayerByUserNotFound(playerId);
		}

		const waitingParticipant: IntrWaitingParticipant = {
			client: client,
			data: {
				id: String(resultParticipant.player.id),
				nickname: resultParticipant.player.nickname as string,
				experience: resultParticipant.player.experience as number,
				type: resultParticipant.type,
			}
		}

		this.waitingParticipants.set(playerId, waitingParticipant);

		console.log(`Игрок ${playerId} добавлен в очередь для игры one vs one`);

		if (this.waitingParticipants.size >= 2) {
			await this.pairPlayers();
		}
	}

	removePlayerFromQueue(playerId: string): void {
		this.waitingParticipants.delete(playerId);
		console.log(`Игрок ${playerId} удален из очереди для игры one vs one`);
	}

	private async pairPlayers(): Promise<void> {
		const participants = Array.from(this.waitingParticipants.values());

		const participant1 = participants[0];
		const participant2 = participants[1];

		const session = await this.serviceGameSession.createSession(participant1, participant2);

		if (session) {
			this.waitingParticipants.delete(String(participant1.data.id));
			this.waitingParticipants.delete(String(participant2.data.id));
		}
	}

	getQueueStatus(): number {
		return this.waitingParticipants.size;
	}
}
