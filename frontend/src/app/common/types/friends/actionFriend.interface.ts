export interface IntrActionFriend {
    idRequest?: number;
    idPlayer: number;
    action: 'add' | 'delete' | 'accept' | 'close';
}