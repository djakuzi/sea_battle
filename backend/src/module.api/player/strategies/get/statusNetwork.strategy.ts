import { Injectable, NotFoundException } from "@nestjs/common";
import { EntityPlayer } from "src/common/entity/game.scheme/player.entity";
import { PlayerRepository } from "../../repositories/player.repository";
import { IntrStandartSchemaStrategy, IntrStandartStrategy } from "src/common/type/strategy/standartStrategy.interface";
import { EntityManager } from "typeorm";
import { IntrStatusNetworkPlayer } from "../../interface/StatusNetwork.interface";
import { buildConditionsFindWhere } from "src/common/util/repository/conditions";
import { EnumNameStrategyGetPlayer } from "../../service/playerGet.service";

export interface IntrArgsStrategyStatusNetwork {
    filter: Partial<EntityPlayer>,
    manager?: EntityManager
}

export type TypeReturnStrategyStatusNetwork = IntrStatusNetworkPlayer | null;

export interface IntrSchemaStrategyStatusNetwork extends IntrStandartSchemaStrategy<IntrArgsStrategyStatusNetwork, TypeReturnStrategyStatusNetwork> {
    args: IntrArgsStrategyStatusNetwork
    return: TypeReturnStrategyStatusNetwork;
}

@Injectable()
export class StrategyStatusNetwork implements IntrStandartStrategy<EnumNameStrategyGetPlayer> {
    readonly name = EnumNameStrategyGetPlayer.STATUS_NETWORK;

    constructor(
        private readonly repoPlayer: PlayerRepository,
    ) { }

    async execute(args: IntrSchemaStrategyStatusNetwork['args']): Promise<IntrSchemaStrategyStatusNetwork['return'] | null> {
        const customSelect: Array<keyof EntityPlayer> = ['is_online', 'last_online'];
        const conditions = buildConditionsFindWhere<EntityPlayer, Partial<EntityPlayer>>(args.filter, 'OR');

        if (!conditions) return null;

        const player = await this.repoPlayer.findOne(conditions, args.manager, customSelect);

        if (!player) {
            throw new NotFoundException('Игрок не найден');
        }

        return player;
    }
}