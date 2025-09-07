import { Controller, Get, HttpCode, HttpStatus, Param, Req, UseGuards } from '@nestjs/common';
import { StatisticPlayerService } from './services/statisticPlayer.service';
import { AuthGuard } from 'src/common/guard/auth/auth.guard';
import { Request } from 'express';
import { FindStatisticPlayerService } from './services/findStatisticPlayer.service';
import { EntityUser } from 'src/common/entity/public.scheme/user.entity';

@Controller('statistic-players')
export class StatisticPlayersController {
    constructor(
        private readonly servicePlayerStatistic: StatisticPlayerService,
        private readonly serviceFindPlayerStatistic: FindStatisticPlayerService
    ) { }

    @HttpCode(HttpStatus.OK)
    @Get()
    @UseGuards(AuthGuard)
    async getMyStatistic(@Req() req: Request) {
        return await this.serviceFindPlayerStatistic.findOneStatistic({
                player_id: (req.user as EntityUser).player.id
            }
        );
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    @UseGuards(AuthGuard)
    async getStatistic(@Param('id') id: string) {
        return await this.serviceFindPlayerStatistic.findOneStatistic({
            player_id: +id,
        });
    }
}
