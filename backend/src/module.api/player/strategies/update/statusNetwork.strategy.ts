import { Injectable } from "@nestjs/common";
import { EntityPlayer } from "src/common/entity/game.scheme/player.entity";
import { PlayerRepository } from "../../repositories/player.repository";
import { IntrStandartSchemaStrategy, IntrStandartStrategy } from "src/common/type/strategy/standartStrategy.interface";
import { EntityManager } from "typeorm";
import { EnumNameStrategyUpdatePlayer } from "../../service/playerUpdate.service";
import { UpdatePlayer, UpdatePlayerData } from "../../interface/UpdatePlayer.interface";
import { ResultUpdateEntity } from "src/common/interface/ResultUpdateEntity.interface";
import { getInfoUpdateEntity } from "src/common/util/other/infoUpdateEntity";

export interface IntrArgsStrategyStatusNetwork {
    data: UpdatePlayer, 
    isOnline: boolean, 
    manager?: EntityManager
}

export type TypeReturnStrategyStatusNetwork = ResultUpdateEntity;

export interface IntrSchemaStrategyStatusNetwork extends IntrStandartSchemaStrategy<IntrArgsStrategyStatusNetwork, TypeReturnStrategyStatusNetwork> {
    args: IntrArgsStrategyStatusNetwork
    return: TypeReturnStrategyStatusNetwork;
}

@Injectable()
export class StrategyStatusNetwork implements IntrStandartStrategy<EnumNameStrategyUpdatePlayer> {
    readonly name = EnumNameStrategyUpdatePlayer.STATUS_NETWORK;

    constructor(
        private readonly repoPlayer: PlayerRepository,
    ) { }

    async execute(args: IntrSchemaStrategyStatusNetwork['args']): Promise<IntrSchemaStrategyStatusNetwork['return']> {
        const options: Partial<EntityPlayer> = {
            is_online: args.isOnline,
            last_online: new Date(),
        }

        const resData: UpdatePlayerData = {
            ...args.data,
            options
        }

        const result = await this.repoPlayer.updateOne(resData, args.manager)

        return getInfoUpdateEntity(result);
    }
}