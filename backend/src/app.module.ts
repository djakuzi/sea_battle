import { Module, NestModule } from '@nestjs/common';
import { ApiModule } from './module.api/api.module';
import { ConfigAppModule } from './module.config/config.module';
import { DatabaseModule } from './module.database/database.module';
import { WsModule } from './module.ws/ws.module';

@Module({
	imports: [ConfigAppModule, DatabaseModule, ApiModule, WsModule],
})
export class AppModule implements NestModule {
	configure() {}
}
