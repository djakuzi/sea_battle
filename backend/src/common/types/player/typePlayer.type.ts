import { EntityPlayer } from "src/common/entity/game.scheme/player.entity";
import { IntrGuest } from "../guest/guest.interface";
import { Role } from "../role";

export type TypePlayerType = Role.PLAYER | Role.GUEST;

export type TypePlayerOrGuest = Partial<EntityPlayer> | IntrGuest;