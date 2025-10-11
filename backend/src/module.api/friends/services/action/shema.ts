import { StrategyListAction } from '../../strategies/action/get/listAction.strategy';
import { ServiceGetFriendAction } from './getFriendAction.service';

export const SCHEMA_SERVICE_ACTION_FRIEND = {
	service: [ServiceGetFriendAction],
	strategy: {
		get: [StrategyListAction],
	},
};
