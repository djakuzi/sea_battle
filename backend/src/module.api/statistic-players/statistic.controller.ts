import { Controller, Get, HttpCode, HttpStatus, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guard/auth/auth.guard';
import { Request } from 'express';
import { ServiceFindStatisticPlayer } from './services/findStatisticPlayer.service';
import { EntityUser } from 'src/common/entity/public.scheme/user.entity';

@Controller('statistic-players')
export class StatisticPlayersController {
	constructor(private readonly serviceFindPlayerStatistic: ServiceFindStatisticPlayer) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	@UseGuards(AuthGuard)
	async getMyStatistic(@Req() req: Request) {
		const args = {
			filter: {
				player_id: (req.user as EntityUser).player.id,
			},
		};
		return await this.serviceFindPlayerStatistic.find(
			ServiceFindStatisticPlayer.strategyName.ONE,
			args
		);
	}

	@HttpCode(HttpStatus.OK)
	@Get(':id')
	@UseGuards(AuthGuard)
	async getStatistic(@Param('id') id: string) {
		const args = {
			filter: {
				player_id: +id,
			},
		};

		return await this.serviceFindPlayerStatistic.find(
			ServiceFindStatisticPlayer.strategyName.ONE,
			args
		);
	}
}
