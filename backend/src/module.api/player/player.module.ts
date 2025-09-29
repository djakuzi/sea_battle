import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EntityPlayer } from "src/common/entity/game.scheme/player.entity";
import { PlayerService } from "./service/player.service";
import { PlayerController } from "./player.controller";
import { PlayerFindService } from "./service/playerFind.service";
import { PlayerRepository } from "./repositories/player.repository";
import { AuthGuardModule } from "src/common/guard/auth/auth-guard.module";
import { StrategyFindOne } from "./strategies/find/onePlayer.strategy";
import { StrategyFindMore } from "./strategies/find/morePlayer.strategy";
import { StrategyStatusNetwork as StrategyGetStatusNetwork } from "./strategies/get/statusNetwork.strategy";
import { StrategyStatusNetwork as StrategyUpdateStatusNetwork } from "./strategies/update/statusNetwork.strategy";
import { PlayerUpdateService } from "./service/playerUpdate.service";
import { PlayerGetService } from "./service/playerGet.service";

const listRepo = [
  PlayerRepository,
]

const listStrategyFind = [
  StrategyFindOne,
  StrategyFindMore,
]

const listStrategyGet = [
  StrategyGetStatusNetwork,
]

const listStrategyUpdate = [
  StrategyUpdateStatusNetwork
]

const listService = [
  PlayerService,
  PlayerFindService,
  PlayerUpdateService,
  PlayerGetService
]


@Module({
  imports: [
    TypeOrmModule.forFeature([
      EntityPlayer
    ]),
    AuthGuardModule
  ],
  controllers: [PlayerController],
  providers: [
    ...listRepo,
    ...listStrategyFind,
    ...listStrategyGet,
    ...listStrategyUpdate,
    ...listService
  ],
  exports: [
    ...listService,
    ...listRepo,
  ]
})

export class PlayerModule { }