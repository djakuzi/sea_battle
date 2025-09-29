import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityStatisticPlayers } from 'src/common/entity/game.scheme/statistic-players.entity';
import { StatisticPlayersController } from './statistic.controller';
import { ChangeStatisticPlayersService } from './services/changeStatistic.service';
import { LIST_СREATIVE_STRATEGIES, ServiceCreativeStatisticPlayer } from './services/createStatisticPlayer.service';
import { AuthGuardModule } from 'src/common/guard/auth/auth-guard.module';
import { LIST_FIND_STRATEGIES, ServiceFindStatisticPlayer } from './services/findStatisticPlayer.service';
import { StatisticPlayersRepository } from './repositories/statistic-players.repository';

const LIST_REPO = [
  StatisticPlayersRepository
]

const LIST_SERVICE = [
  ChangeStatisticPlayersService,
  ServiceFindStatisticPlayer,
  ServiceCreativeStatisticPlayer,
]

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EntityStatisticPlayers
    ]),
    AuthGuardModule
  ],
  controllers: [StatisticPlayersController],
  providers: [
    ...LIST_REPO,
    ...LIST_SERVICE,
    ...LIST_FIND_STRATEGIES,
    ...LIST_СREATIVE_STRATEGIES
  ],
  exports: [
    ...LIST_REPO,
    ...LIST_SERVICE,
  ]
})
export class StatisticPlayersModule { }
