import { Module, NestModule } from '@nestjs/common';
import { ApiModule } from './module.api/api.module';
import { ConfigAppModule } from './module.config/config.module';
import { DatabaseModule } from './module.database/database.module';
import { WsModule } from './module.ws/ws.module';
import { ModuleCron } from './module.cron/cron.module';

@Module({
	imports: [
		ConfigAppModule, 
		DatabaseModule, 
		ApiModule,
		WsModule,
		ModuleCron
	],
})
export class AppModule implements NestModule {
	configure() {}
}
