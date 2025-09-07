import { Injectable } from "@nestjs/common";
import { EntityPlayer } from "src/common/entity/game.scheme/player.entity";
import { EntityManager } from "typeorm";
import { UpdatePlayer, UpdatePlayerData } from "../interface/UpdatePlayer.interface";
import { ResultUpdateEntity } from "src/common/interface/ResultUpdateEntity.interface";
import { getInfoUpdateEntity } from "src/common/util/other/infoUpdateEntity";
import { PLayerRepository } from "../repositories/player.repository";

@Injectable()
export class PlayerChangeService {
    constructor(
        private readonly repoPlayer: PLayerRepository,
    ) { }

    async updateStatusOnline(data: UpdatePlayer, isOnline: boolean, manager?: EntityManager): Promise<ResultUpdateEntity> {
        const options: Partial<EntityPlayer> = {
            is_online: isOnline,
            last_online: new Date(),
        }

        const resData: UpdatePlayerData = {
            ...data,
            options
        }

        const result = await this.repoPlayer.updateOne(resData, manager)

        return getInfoUpdateEntity(result);
    }
}