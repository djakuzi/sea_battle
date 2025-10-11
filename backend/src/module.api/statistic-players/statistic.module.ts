import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityStatisticPlayers } from 'src/common/entity/game.scheme/statistic-players.entity';
import { StatisticPlayersController } from './statistic.controller';
import { AuthGuardModule } from 'src/common/guard/auth/auth-guard.module';
import { SCHEMA_SERVICE_STATISCTIC_PLAYER } from './services/schema';
import { unpackSchemaService } from 'src/common/util/unpack/schemaService.util';

@Module({
	imports: [TypeOrmModule.forFeature([EntityStatisticPlayers]), AuthGuardModule],
	controllers: [StatisticPlayersController],
	providers: [...unpackSchemaService(SCHEMA_SERVICE_STATISCTIC_PLAYER)],
	exports: [
		...SCHEMA_SERVICE_STATISCTIC_PLAYER.repo,
		...SCHEMA_SERVICE_STATISCTIC_PLAYER.service,
	],
})
export class StatisticPlayersModule {}
