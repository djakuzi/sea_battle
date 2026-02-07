import { StrategyMore } from '../../strategies/friendship/find/more.strategy';
import { StrategyByList } from '../../strategies/friendship/is/byList.strategy';
import { ServiceFindFriendShip } from './findFriendShip.service';
import { ServiceIsFriendShip } from './isFriendShip.service';
import { ServiceCreateFriendship } from './createFriendShip.service';
import { ServiceRemoveFriendship } from './removeFriendship.service';
import { StrategyDefault as StrategyCreateDefault } from '../../strategies/friendship/create/default.strategy';
import { StrategyDefault as StrategyRemoveDefault } from '../../strategies/friendship/remove/default.strategy';

export const SCHEMA_SERVICE_FRIEND = {
	service: [
		ServiceFindFriendShip,
		ServiceIsFriendShip,
		ServiceCreateFriendship,
		ServiceRemoveFriendship,
	],
	strategy: {
		is: [StrategyByList],
		find: [StrategyMore],
		create: [StrategyCreateDefault],
		remove: [StrategyRemoveDefault],
	},
};
