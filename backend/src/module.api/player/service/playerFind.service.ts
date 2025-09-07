import { ConflictException, Injectable } from "@nestjs/common";
import { EntityPlayer } from "src/common/entity/game.scheme/player.entity";
import { EntityManager} from "typeorm";
import { buildConditionsFindWhere } from "src/common/util/repository/conditions";
import { ResultFindPlayer } from "../interface/ResultFindPlayer.interface";
import { CustomOptionSelect } from "src/common/type/repository/CustomOptionSelect.type";
import { PLayerRepository } from "../repositories/player.repository";

@Injectable()
export class PlayerFindService {
    constructor(
        private readonly repoPlayer: PLayerRepository,
    ){}

    async findPlayers(filter: Partial<EntityPlayer>): Promise<ResultFindPlayer | null>  {
        const players = await this.repoPlayer.findPlayers(filter);
        
        if (!players || players?.length == 0) {
            throw new ConflictException('Игроки не найдены');
        }

        return {
            players: players
        }
    }

    async findOne(filter: Partial<EntityPlayer>, manager?: EntityManager, select?: CustomOptionSelect<EntityPlayer>): Promise<EntityPlayer | null> {
        const conditions = buildConditionsFindWhere<EntityPlayer, Partial<EntityPlayer>>(filter, 'OR');
        if (!conditions) return null;

        const player = await this.repoPlayer.findOne(conditions, manager, select);
        return player 
    }
}