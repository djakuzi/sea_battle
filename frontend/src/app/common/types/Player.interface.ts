export interface IntrPlayerFull {
    id: number;
    user_id: number;
    experience: number;
    avatar: string;
    nickname: string;
    is_online: boolean;
    last_online: Date;
    updated_at: Date;
}

export interface IntrStatusNetworkPlayer {
    is_online: boolean;
    last_online: Date;
}

