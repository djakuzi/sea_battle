import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ServicePlayerFind } from './service/playerFind.service';
import { FindPlayerDto } from './dto/findPlayer.dto';
import { DtoPlayerOnlineStatus } from './dto/statusOnlinePlayer.dto';
import { DtoUpdatedPlayer } from './dto/updatePlayer.dto';
import { ServicePlayerGet } from './service/playerGet.service';

@Controller('player')
export class PlayerController {
	constructor(
		private readonly playerFindService: ServicePlayerFind,
		private readonly playerGetService: ServicePlayerGet
	) {}

	@HttpCode(HttpStatus.OK)
	@Post('update-me')
	async updateMe(@Body() dto: DtoUpdatedPlayer) {
		// return await this.playerFindService.updateDataPlayer();
	}

	@HttpCode(HttpStatus.OK)
	@Post('find-players')
	async find(@Body() dto: FindPlayerDto) {
		const args = {
			filter: {
				nickname: dto.nickname,
			},
		};

		return await this.playerFindService.find(ServicePlayerFind.strategyName.MORE, args);
	}

	@HttpCode(HttpStatus.OK)
	@Post('status-network')
	async getStatusOnline(@Body() dto: DtoPlayerOnlineStatus) {
		const args = {
			filter: dto,
		};
		return await this.playerGetService.get(ServicePlayerGet.strategyName.STATUS_NETWORK, args);
	}
}
