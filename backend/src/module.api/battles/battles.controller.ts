import { Controller, Get, HttpCode, HttpStatus, Req, UseGuards } from "@nestjs/common";
import { ServiceGetBattles } from "./services/getBattles.service";
import { Request } from 'express';
import { AuthGuard } from "src/common/guard/auth/auth.guard";
import { EntityUser } from "src/common/entity/public.scheme/user.entity";

@Controller('battles')
export class ControllerBattles {
	constructor(
		private readonly serviceGetBattle: ServiceGetBattles
	) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	async getMyBattleOneVsOne(@Req() req: Request) {
		const argsFind = {
			idPlayer: (req.user as EntityUser).player.id,
		};

		return await this.serviceGetBattle.get(ServiceGetBattles.strategyName.ONE_VS_ONE, argsFind);
	}
}
