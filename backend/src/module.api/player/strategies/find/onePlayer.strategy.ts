import { Injectable } from "@nestjs/common";
import { EntityPlayer } from "src/common/entity/game.scheme/player.entity";
import { CustomOptionSelect } from "src/common/type/repository/CustomOptionSelect.type";
import { buildConditionsFindWhere } from "src/common/util/repository/conditions";
import { EntityManager } from "typeorm";
import { PlayerRepository } from "../../repositories/player.repository";
import { EnumNameStrategyFindPlayer } from "../../service/playerFind.service";
import { IntrStandartSchemaStrategy, IntrStandartStrategy } from "src/common/type/strategy/standartStrategy.interface";

export interface IntrArgsStrategyFindOne {
    filter: Partial<EntityPlayer>,
    manager?: EntityManager,
    select?: CustomOptionSelect<EntityPlayer>
}

export type TypeReturnStrategyFindOne = EntityPlayer;

export interface IntrSchemaStrategyFindOne extends IntrStandartSchemaStrategy<IntrArgsStrategyFindOne, TypeReturnStrategyFindOne> {
    args: IntrArgsStrategyFindOne;
    return: EntityPlayer;
}

@Injectable()
export class StrategyFindOne implements IntrStandartStrategy<EnumNameStrategyFindPlayer> {
    readonly name = EnumNameStrategyFindPlayer.ONE;

    constructor(
        private readonly repoPlayer: PlayerRepository,
    ) { }

    async execute(args: IntrSchemaStrategyFindOne['args']): Promise<IntrSchemaStrategyFindOne['return'] | null> {
        const conditions = buildConditionsFindWhere<EntityPlayer, Partial<EntityPlayer>>(args.filter, 'OR');
        if (!conditions) return null;

        const player = await this.repoPlayer.findOne(conditions, args.manager, args.select);
        return player
    }
}