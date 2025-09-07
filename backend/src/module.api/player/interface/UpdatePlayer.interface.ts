import { EntityPlayer } from "src/common/entity/game.scheme/player.entity";

export type TypeEntityId = 'players' | 'users';

export interface UpdatePlayer {
    id: number;
    typeEntityId: TypeEntityId;
}

export interface UpdatePlayerData extends UpdatePlayer {
    options: Partial<EntityPlayer>
}
