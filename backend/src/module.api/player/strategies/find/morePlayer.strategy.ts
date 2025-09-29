import { Injectable, ConflictException } from "@nestjs/common";
import { EntityPlayer } from "src/common/entity/game.scheme/player.entity";
import { PlayerRepository } from "../../repositories/player.repository";
import { EnumNameStrategyFindPlayer } from "../../service/playerFind.service";
import { IntrStandartSchemaStrategy, IntrStandartStrategy } from "src/common/type/strategy/standartStrategy.interface";

export interface IntrArgsStrategyFindMore {
    filter: Partial<EntityPlayer>,
}

export interface TypeReturnStrategyFindMore {
    players: EntityPlayer[]
}

export interface IntrSchemaStrategyFindMore extends IntrStandartSchemaStrategy<IntrArgsStrategyFindMore, TypeReturnStrategyFindMore> {
    args: IntrArgsStrategyFindMore
    return: TypeReturnStrategyFindMore;
}

@Injectable()
export class StrategyFindMore implements IntrStandartStrategy<EnumNameStrategyFindPlayer> {
    readonly name = EnumNameStrategyFindPlayer.MORE;

    constructor(
        private readonly repoPlayer: PlayerRepository,
    ) { }

    async execute(data: IntrSchemaStrategyFindMore['args']): Promise<IntrSchemaStrategyFindMore['return'] | null> {
        const players = await this.repoPlayer.findPlayers(data.filter);

        if (!players || players?.length == 0) {
            throw new ConflictException('Игроки не найдены');
        }

        return {
            players: players
        }
    }
}