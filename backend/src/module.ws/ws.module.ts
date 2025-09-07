import { Module } from '@nestjs/common';
import { StatusServerGateway } from './gateway/status-server/status-server.gateway';
import { BattleGateway } from './gateway/battle/battle.gateway';
import { ServiceStorageSocket } from 'src/common/service/StorageSocketService';

@Module({
    providers: [
        StatusServerGateway,
        BattleGateway,
        ServiceStorageSocket,
    ],
})
export class WsModule {}