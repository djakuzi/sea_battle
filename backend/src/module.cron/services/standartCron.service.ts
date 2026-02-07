import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ServiceOnlinePlayers } from 'src/module.api/info/service/onlinePlayers.service';

@Injectable()
export class ServiceStandartCron {
	constructor(
		private readonly serviceOnlinePlayers: ServiceOnlinePlayers
	) {}

	@Cron(CronExpression.EVERY_5_MINUTES)
	updateOnlinePlayerCount() {
		this.serviceOnlinePlayers.updateOnlinePlayerCount();
	}
}
