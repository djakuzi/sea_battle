import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { UsersRepository } from 'src/module.api/user/repositories/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityUser } from 'src/common/entity/public.scheme/user.entity';
import { EntityVerificationsUsers } from 'src/common/entity/public.scheme/verifications_users.entity';
import { EntityVerifications } from 'src/common/entity/reference.scheme/verifications.entity';
import { VerificationsUsersRepository } from 'src/module.api/auth/repositories/verififcations_users.repository';
import { UserService } from '../user/service/user.service';
import { VerififcationUserService } from './service/verification-user.service';
import { RoleUserService } from '../role/services/role_user.service';
import { EntityRolesUsers } from 'src/common/entity/links.scheme/roles_users.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/core/config/jwt.config';
import { TokenService } from './service/token.service';
import { EntityPlayer } from 'src/common/entity/game.scheme/player.entity';
import { PlayerFindService } from '../player/service/playerFind.service';
import { PlayerChangeService } from '../player/service/playerChange.service';
import { PlayerService } from '../player/service/player.service';
import { StatisticPlayersModule } from '../statistic-players/statistic.module';
import { RolesUsersRepository } from '../role/repositories/roles_users.reposotory';
import { PLayerRepository } from '../player/repositories/player.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      EntityUser,
      EntityVerificationsUsers,
      EntityVerifications,
      EntityRolesUsers,
      EntityPlayer
    ]),
    JwtModule.registerAsync({
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
    StatisticPlayersModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    UsersRepository,
    UserService,
    VerificationsUsersRepository,
    VerififcationUserService,
    RolesUsersRepository,
    RoleUserService,
    PLayerRepository,
    PlayerFindService,
    PlayerChangeService,
    PlayerService
  ],
})

export class AuthModule { }
