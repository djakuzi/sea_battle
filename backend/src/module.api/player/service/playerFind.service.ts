import { Injectable, NotImplementedException } from "@nestjs/common";
import { IntrSchemaStrategyFindOne, StrategyFindOne } from "../strategies/find/onePlayer.strategy";
import { IntrSchemaStrategyFindMore, StrategyFindMore } from "../strategies/find/morePlayer.strategy";
import { IntrStandartStrategy } from "src/common/type/strategy/standartStrategy.interface";

export enum EnumNameStrategyFindPlayer {
    ONE = 'one',
    MORE = 'more',
}

export interface IntrMapStrategyFindPlayer {
    [EnumNameStrategyFindPlayer.MORE]: IntrSchemaStrategyFindMore,
    [EnumNameStrategyFindPlayer.ONE]: IntrSchemaStrategyFindOne,
}

@Injectable()
export class PlayerFindService {
    private mapFindPlayers = new Map<EnumNameStrategyFindPlayer, IntrStandartStrategy<EnumNameStrategyFindPlayer>>();
    
    constructor(
        private readonly strategyOne: StrategyFindOne,
        private readonly strategyMore: StrategyFindMore
    ) {
        this.mapFindPlayers.set(this.strategyOne.name, this.strategyOne);
        this.mapFindPlayers.set(this.strategyMore.name, this.strategyMore);
    }

    async find<M extends EnumNameStrategyFindPlayer>(
        method: M,
        args: IntrMapStrategyFindPlayer[M]['args']
    ): Promise<IntrMapStrategyFindPlayer[M]['return']> {
        const strategy = this.mapFindPlayers.get(method);

        if (!strategy) {
            throw new NotImplementedException(`Стратегия поиска игрока не найдена: ${method}`);
        }

        return await strategy.execute(args) as IntrMapStrategyFindPlayer[M]['return'];
    }
}