import { Module } from '@nestjs/common';
import { ModuleInfo } from 'src/module.api/info/info.module';
import { unpackSchemaWebsocket } from 'src/common/util/unpack/schemaWebsocket.util';
import { SCHEMA_WEBSCOKET } from './gateway/schema';
import { PlayerModule } from 'src/module.api/player/player.module';
import { ModuleStatisticPlayers } from 'src/module.api/statistic-players/statistic.module';
import { ModuleBattles } from 'src/module.api/battles/battles.module';

@Module({
	imports: [
		ModuleInfo,
		PlayerModule,
		ModuleStatisticPlayers,
		ModuleBattles
	],
	providers: [
		...unpackSchemaWebsocket(SCHEMA_WEBSCOKET)
	],
})
export class WsModule { }
