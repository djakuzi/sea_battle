import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EntityPlayer } from "src/common/entity/game.scheme/player.entity";
import { PlayerService } from "./service/player.service";
import { PlayerController } from "./player.controller";
import { PlayerChangeService } from "./service/playerChange.service";
import { PlayerFindService } from "./service/playerFind.service";
import { PLayerRepository } from "./repositories/player.repository";
import { AuthGuardModule } from "src/common/guard/auth/auth-guard.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EntityPlayer
    ]),
    AuthGuardModule
  ],
  controllers: [PlayerController],
  providers: [
    PLayerRepository,
    PlayerChangeService,
    PlayerService,
    PlayerFindService
  ],
})

export class PlayerModule { }