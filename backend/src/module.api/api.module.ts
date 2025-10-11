import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { PlayerModule } from './player/player.module';
import { StatisticPlayersModule } from './statistic-players/statistic.module';
import { FriendModule } from './friends/friend.module';
import { ModuleInfo } from './info/info.module';

@Module({
	imports: [
		AuthModule,
		RoleModule,
		UserModule,
		PlayerModule,
		StatisticPlayersModule,
		FriendModule,
		ModuleInfo,
	],
})
export class ApiModule {}
