import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ServiceOnlinePlayers {
	private activePlayers: Set<string> = new Set();
	private onlinePlayerCount: number = 0;

	addPlayer(playerId: string) {
		this.activePlayers.add(playerId);
	}

	removePlayer(playerId: string) {
		this.activePlayers.delete(playerId);
	}

	@Cron(CronExpression.EVERY_5_MINUTES)
	updateOnlinePlayerCount() {
		this.onlinePlayerCount = this.activePlayers.size;
		console.log(`Обновленное количество онлайн-игроков: ${this.onlinePlayerCount}`);
	}

	getOnlinePlayerCount(): number {
		return this.onlinePlayerCount;
	}
}
