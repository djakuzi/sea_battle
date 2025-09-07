import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityStatisticPlayers } from 'src/common/entity/game.scheme/statistic-players.entity';
import { StatisticPlayersController } from './statistic.controller';
import { ChangeStatisticPlayersService } from './services/changeStatistic.service';
import { StatisticPlayerService } from './services/statisticPlayer.service';
import { AuthGuardModule } from 'src/common/guard/auth/auth-guard.module';
import { FindStatisticPlayerService } from './services/findStatisticPlayer.service';
import { StatisticPlayersRepository } from './repositories/statistic-players.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EntityStatisticPlayers
    ]),
    AuthGuardModule
  ],
  controllers: [StatisticPlayersController],
  providers: [
    StatisticPlayersRepository,
    ChangeStatisticPlayersService,
    StatisticPlayerService,
    FindStatisticPlayerService
  ],
  exports: [
    StatisticPlayersRepository,
    ChangeStatisticPlayersService,
    StatisticPlayerService,
    FindStatisticPlayerService
  ]
})
export class StatisticPlayersModule {}
