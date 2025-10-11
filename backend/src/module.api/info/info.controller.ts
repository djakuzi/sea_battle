import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ServiceOnlinePlayers } from './service/onlinePlayers.service';

@Controller('info')
export class ControllerInfo {
	constructor(private readonly serviceOnlinePlayers: ServiceOnlinePlayers) {}

	@HttpCode(HttpStatus.OK)
	@Get('count-online')
	async getCountOnline() {
		return {
			count: this.serviceOnlinePlayers.getOnlinePlayerCount(),
		};
	}
}
