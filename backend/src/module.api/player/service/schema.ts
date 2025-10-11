import { ServicePlayerFind } from './playerFind.service';
import { ServicePlayerGet } from './playerGet.service';
import { ServicePlayerUpdate } from './playerUpdate.service';
import { StrategyStatusNetwork as StrategyGetStatusNetwork } from '../strategies/get/statusNetwork.strategy';
import { StrategyStatusNetwork as StrategyUpdateStatusNetwork } from '../strategies/update/statusNetwork.strategy';
import { StrategyFindOne } from '../strategies/find/onePlayer.strategy';
import { StrategyFindMore } from '../strategies/find/morePlayer.strategy';
import { PlayerRepository } from '../repositories/player.repository';
import { ServiceCreatePlayer } from './createPlayer.service';
import { StrategyDefault } from '../strategies/create/default.strategy';
import { StrategyGuestOrPlayer } from '../strategies/get/guestOrPlayer';

export const SCHEMA_SERVICE_PLAYER = {
	repo: [PlayerRepository],
	service: [ServiceCreatePlayer, ServicePlayerFind, ServicePlayerGet, ServicePlayerUpdate],
	strategy: {
		create: [StrategyDefault],
		get: [
			StrategyGetStatusNetwork,
			StrategyGuestOrPlayer
		],
		find: [StrategyFindOne, StrategyFindMore],
		update: [StrategyUpdateStatusNetwork],
	},
};
