import { Injectable } from '@nestjs/common';

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

	updateOnlinePlayerCount() {
		this.onlinePlayerCount = this.activePlayers.size;
		console.log(`Обновленное количество онлайн-игроков: ${this.onlinePlayerCount}`);
	}

	getOnlinePlayerCount(): number {
		if (this.onlinePlayerCount == 0) {
			this.updateOnlinePlayerCount();
		}
		
		return this.onlinePlayerCount;
	}
}
