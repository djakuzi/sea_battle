import { EntityFriendRequest } from 'src/common/entity/game.scheme/friendRequest.entity';

export interface IntrResFindRequestByList {
	listRequest: Partial<EntityFriendRequest>[];
}
