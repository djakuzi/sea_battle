import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityUser } from 'src/common/entity/public.scheme/user.entity';
import { EntityVerificationsUsers } from 'src/common/entity/public.scheme/verifications_users.entity';
import { EntityVerifications } from 'src/common/entity/reference.scheme/verifications.entity';
import { VerificationsUsersRepository } from 'src/module.api/auth/repositories/verififcations_users.repository';
import { ServiceVerififcationUser } from './service/verification-user.service';
import { EntityRolesUsers } from 'src/common/entity/links.scheme/roles_users.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/core/config/jwt.config';
import { TokenService } from './service/token.service';
import { EntityPlayer } from 'src/common/entity/game.scheme/player.entity';
import { StatisticPlayersModule } from '../statistic-players/statistic.module';
import { AuthGuardModule } from 'src/common/guard/auth/auth-guard.module';
import { UserModule } from '../user/user.module';
import { StrategyRegisterEmail } from './strategies/register/email.strategies';
import { StrategyEmailSignIn } from './strategies/signIn/email.strategies';
import { PlayerModule } from '../player/player.module';
import { RoleModule } from '../role/role.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			EntityUser,
			EntityVerificationsUsers,
			EntityVerifications,
			EntityRolesUsers,
			EntityPlayer,
		]),
		JwtModule.registerAsync({
			useFactory: getJwtConfig,
			inject: [ConfigService],
		}),
		AuthGuardModule,
		UserModule,
		StatisticPlayersModule,
		PlayerModule,
		RoleModule,
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		TokenService,
		VerificationsUsersRepository,
		ServiceVerififcationUser,
		StrategyRegisterEmail,
		StrategyEmailSignIn,
	],
})
export class AuthModule {}
