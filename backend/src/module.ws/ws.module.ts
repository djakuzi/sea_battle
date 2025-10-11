import { Module } from '@nestjs/common';
import { ModuleInfo } from 'src/module.api/info/info.module';
import { unpackSchemaWebsocket } from 'src/common/util/unpack/schemaWebsocket.util';
import { SCHEMA_WEBSCOKET } from './gateway/schema';
import { PlayerModule } from 'src/module.api/player/player.module';

@Module({
	imports: [
		ModuleInfo,
		PlayerModule
	],
	providers: [
		...unpackSchemaWebsocket(SCHEMA_WEBSCOKET)
	],
})
export class WsModule {}
