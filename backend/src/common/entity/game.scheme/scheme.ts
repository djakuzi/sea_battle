import { EntityFriendRequest } from "./friendRequest.entity";
import { EntityFriendship } from "./friendShip.entity";
import { EntityPlayer } from "./player.entity";
import { EntityStatisticPlayers } from "./statistic-players.entity";

export const SCHEME_ENTITY_GAME = [
	EntityFriendRequest, 
	EntityPlayer, 
	EntityStatisticPlayers,
	EntityFriendship,
];