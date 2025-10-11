import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityPlayer } from 'src/common/entity/game.scheme/player.entity';
import { PlayerController } from './player.controller';
import { AuthGuardModule } from 'src/common/guard/auth/auth-guard.module';
import { SCHEMA_SERVICE_PLAYER } from './service/schema';
import { unpackSchemaService } from 'src/common/util/unpack/schemaService.util';

@Module({
	imports: [TypeOrmModule.forFeature([EntityPlayer]), AuthGuardModule],
	controllers: [PlayerController],
	providers: [...unpackSchemaService(SCHEMA_SERVICE_PLAYER)],
	exports: [...SCHEMA_SERVICE_PLAYER.repo, ...SCHEMA_SERVICE_PLAYER.service],
})
export class PlayerModule {}
