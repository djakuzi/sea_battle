export type TypeEntityId = 'players' | 'users';

export interface IntrOnlineStatusPlayer {
    is_online: boolean;
    last_online: Date;
}
