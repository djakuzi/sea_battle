import { Module } from '@nestjs/common';
import { StatusServerGateway } from './gateway/status-server/status-server.gateway';
import { BattleGateway } from './gateway/battle/battle.gateway';
import { ServiceStorageSocket } from 'src/common/service/StorageSocketService';
import { PingService } from './gateway/status-server/service/ping.service';

@Module({
    providers: [
        StatusServerGateway,
        BattleGateway,
        ServiceStorageSocket,
        PingService,
    ],
})
export class WsModule {}