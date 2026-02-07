import { EntityPlayer } from 'src/common/entity/game.scheme/player.entity';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';

export interface IntrFindFriendship {
	idPlayer: number;
	fields: (keyof EntityPlayer)[];
	manager?: EntityManager;
}
