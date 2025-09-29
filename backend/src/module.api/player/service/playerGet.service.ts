import { Injectable, NotImplementedException } from "@nestjs/common";
import { IntrStandartStrategy } from "src/common/type/strategy/standartStrategy.interface";
import { IntrSchemaStrategyStatusNetwork, StrategyStatusNetwork } from "../strategies/get/statusNetwork.strategy";

export enum EnumNameStrategyGetPlayer {
    STATUS_NETWORK = 'status-network',
}

export interface IntrMapStrategyGetPlayer {
    [EnumNameStrategyGetPlayer.STATUS_NETWORK]: IntrSchemaStrategyStatusNetwork,
}

@Injectable()
export class PlayerGetService {
    private mapGetPlayers = new Map<EnumNameStrategyGetPlayer, IntrStandartStrategy<EnumNameStrategyGetPlayer>>();
    constructor(
        // private readonly strategyStatusNetwork: StrategyGetStatusNetwork
    ) {
        // this.mapGetPlayers.set(this.strategyStatusNetwork.name, this.strategyStatusNetwork);
    }

    async get<M extends EnumNameStrategyGetPlayer>(
        method: M,
        args: IntrMapStrategyGetPlayer[M]['args']
    ): Promise<IntrMapStrategyGetPlayer[M]['return']> {
        const strategy = this.mapGetPlayers.get(method);

        if (!strategy) {
            throw new NotImplementedException(`Стратегия получения данных игрока не найдена: ${method}`);
        }

        return await strategy.execute(args) as IntrMapStrategyGetPlayer[M]['return'];
    }
}