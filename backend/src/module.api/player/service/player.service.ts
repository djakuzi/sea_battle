import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EntityPlayer } from "src/common/entity/game.scheme/player.entity";
import { EntityManager } from "typeorm";
import { PlayerRepository } from "../repositories/player.repository";

@Injectable()
export class PlayerService {
    constructor(
        private readonly repoPlayer: PlayerRepository,
    ) { }

    async createPlayer(data: Partial<EntityPlayer>, manager?: EntityManager): Promise<EntityPlayer> {
        const res = await this.repoPlayer.createPlayer(data, manager);

        if (!res) throw new InternalServerErrorException('Произошла ошибка при создании игрока');
        
        return res;
    }
}