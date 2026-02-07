import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityFriendRequest } from 'src/common/entity/game.scheme/friendRequest.entity';
import { EntityFriendship } from 'src/common/entity/game.scheme/friendShip.entity';
import { AuthGuardModule } from 'src/common/guard/auth/auth-guard.module';
import { RepoFriendRequest } from './repositories/friendReguest.repo';
import { RepoFriendShip } from './repositories/friendship.repo';
import { FriendController } from './friend.controller';
import { SCHEMA_SERVICE_REGUEST_FRIEND } from './services/reguest/schema';
import { SCHEMA_SERVICE_ACTION_FRIEND } from './services/action/shema';
import { unpackSchemaService } from 'src/common/util/unpack/schemaService.util';
import { SCHEMA_SERVICE_FRIEND } from './services/friendship/shema';

const listRepo = [RepoFriendShip, RepoFriendRequest];

@Module({
	imports: [TypeOrmModule.forFeature([EntityFriendRequest, EntityFriendship]), AuthGuardModule],
	controllers: [FriendController],
	providers: [
		...listRepo,
		...unpackSchemaService(SCHEMA_SERVICE_FRIEND),
		...unpackSchemaService(SCHEMA_SERVICE_REGUEST_FRIEND),
		...unpackSchemaService(SCHEMA_SERVICE_ACTION_FRIEND),
	],
	exports: [...listRepo],
})
export class FriendModule { }
