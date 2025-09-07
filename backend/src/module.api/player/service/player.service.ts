import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EntityPlayer } from "src/common/entity/game.scheme/player.entity";
import { EntityManager} from "typeorm";
import { PlayerFindService } from "./playerFind.service";
import { DtoPlayerOnlineStatus } from "../dto/statusOnlinePlayer.dto";
import { IntrOnlineStatusPlayer } from "../interface/StatusOnline.interface";
import { PLayerRepository } from "../repositories/player.repository";

@Injectable()
export class PlayerService {
    constructor(
        private readonly repoPlayer: PLayerRepository,
        private readonly playerFindService: PlayerFindService,
    ){}

    async createPlayer(data: Partial<EntityPlayer>, manager?: EntityManager): Promise<EntityPlayer> {
        const res = await this.repoPlayer.createPlayer(data, manager);

        if (!res) throw new InternalServerErrorException('Произошла ошибка при создании игрока');
        return res;
    }

    async getStatusOnline(
        filter: DtoPlayerOnlineStatus,
        manager?: EntityManager
    ): Promise<IntrOnlineStatusPlayer | null> {
        const customSelect: Array<keyof EntityPlayer> = ['is_online', 'last_online'];
        const res = await this.playerFindService.findOne(filter, manager, customSelect);

        if (!res) {
            throw new NotFoundException('Игрок не найден');
        }

        return res;
    }
}