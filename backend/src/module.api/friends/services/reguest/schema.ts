import { StrategyDefault as StrategyRemoveDefault } from '../../strategies/friendship/remove/default.strategy';
import { StrategyDefault as StrategyCreateDefault } from '../../strategies/reguest/create/default.strategy';
import { StrategyDefault as StrategyAcceptDefault } from '../../strategies/reguest/accept/default.strategy';
import { StrategyByList } from '../../strategies/reguest/find/byList.strategy';
import { StrategyOne } from '../../strategies/reguest/find/one.strategy';
import { StrategyReceivedRequests } from '../../strategies/reguest/get/receivedRequests.strategy';
import { ServiceAcceptFriendReguest } from './acceptFriendRequest.service';
import { ServiceCreateReguestFriend } from './createFriendRequest.service';
import { ServiceFindReguestFriend } from './findFriendRequest.service';
import { ServiceFriendRequest } from './friendRequest.service';
import { ServiceGetReguestFriend } from './getFriendRequest.service';
import { ServiceRemoveFriendReguest } from './removeFriendRequest.service';

export const SCHEMA_SERVICE_REGUEST_FRIEND = {
	service: [
		ServiceFriendRequest,
		ServiceGetReguestFriend,
		ServiceFindReguestFriend,
		ServiceRemoveFriendReguest,
		ServiceAcceptFriendReguest,
		ServiceCreateReguestFriend,
	],
	strategy: {
		get: [StrategyReceivedRequests],
		find: [StrategyOne, StrategyByList],
		remove: [StrategyRemoveDefault],
		accept: [StrategyAcceptDefault],
		create: [StrategyCreateDefault],
	},
};
