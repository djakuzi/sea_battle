import { EntityManager } from 'typeorm/entity-manager/EntityManager';

export interface IntrFindFriendsByList {
	list: number[];
	id: number;
	manager?: EntityManager;
}
