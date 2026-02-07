export type TypeEntityId = 'players' | 'users';

export interface IntrStatusNetworkPlayer {
	is_online: boolean;
	last_online: Date;
}
