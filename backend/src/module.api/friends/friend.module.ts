import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FrinedController } from "./friend.controller";
import { EntityFriendRequest } from "src/common/entity/game.scheme/friendRequest.entity";
import { FriendshipService } from "./services/friendship.service";
import { FriendRequestService } from "./services/friendRequest.service";
import { EntityFriendship } from "src/common/entity/game.scheme/friendShip.entity";
import { AuthGuardModule } from "src/common/guard/auth/auth-guard.module";
import { FriendRequestRepository } from "./repositories/friendReguest.repository";
import { CommonFriendService } from "./services/commonFriend.service";
import { FriendShipRepository } from "./repositories/friendship.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EntityFriendRequest,
      EntityFriendship
    ]),
    AuthGuardModule
  ],
  controllers: [FrinedController],
  providers: [
    FriendRequestRepository,
    FriendRequestService,
    FriendShipRepository,
    FriendshipService,
    CommonFriendService,
  ],
})

export class FriendModule { }