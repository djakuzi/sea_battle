import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { PlayerFindService } from './service/playerFind.service';
import { FindPlayerDto } from './dto/findPlayer.dto';
import { DtoPlayerOnlineStatus } from './dto/statusOnlinePlayer.dto';
import { PlayerService } from './service/player.service';
import { AuthGuard } from 'src/common/guard/auth/auth.guard';

@Controller('player')
export class PlayerController {
    constructor(
        private readonly playerService: PlayerService,
        private readonly playerFindService: PlayerFindService
    ) { }

    @HttpCode(HttpStatus.OK)
    @Post('find-players')
    async find(@Body() dto: FindPlayerDto) {
        return await this.playerFindService.findPlayers(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('status-online')
    async getStatusOnline(@Body() dto: DtoPlayerOnlineStatus) {
        return await this.playerService.getStatusOnline(dto);
    }
}
