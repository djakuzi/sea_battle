import { Injectable, NotImplementedException } from "@nestjs/common";
import { IntrStandartStrategy } from "src/common/type/strategy/standartStrategy.interface";
import { IntrSchemaStrategyStatusNetwork, StrategyStatusNetwork } from "../strategies/update/statusNetwork.strategy";

export enum EnumNameStrategyUpdatePlayer {
    STATUS_NETWORK = 'status-network',
    // FULL_FIELDS = 'full-fields',
}

export interface IntrMapStrategyGetPlayer {
    [EnumNameStrategyUpdatePlayer.STATUS_NETWORK]: IntrSchemaStrategyStatusNetwork,
}

@Injectable()
export class PlayerUpdateService {
    private mapGetPlayers = new Map<EnumNameStrategyUpdatePlayer, IntrStandartStrategy<EnumNameStrategyUpdatePlayer>>();
    constructor(
        private readonly strategyStatusNetwork: StrategyStatusNetwork
    ) {
        this.mapGetPlayers.set(this.strategyStatusNetwork.name, this.strategyStatusNetwork);
    }

    async update<M extends EnumNameStrategyUpdatePlayer>(
        method: M,
        args: IntrMapStrategyGetPlayer[M]['args']
    ): Promise<IntrMapStrategyGetPlayer[M]['return']> {
        const strategy = this.mapGetPlayers.get(method);

        if (!strategy) {
            throw new NotImplementedException(`Стратегия получения данных игрока не найдена: ${method}`);
        }

        return strategy.execute(args) as IntrMapStrategyGetPlayer[M]['return'];
    }
}