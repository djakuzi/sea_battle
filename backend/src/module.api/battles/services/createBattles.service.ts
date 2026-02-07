import { Injectable, NotImplementedException } from "@nestjs/common";
import { IntrStandartStrategy } from "src/common/types/strategy/standartStrategy.interface";
import { IntrSchemaStrategyOneVsOne, StrategyOneVsOne } from "../strategies/create/oneVsOne.strategy";

export enum EnumNameStrategy {
	ONE_VS_ONE = 'ONE_VS_ONE',
}

export interface IntrMapStrategyCreateBattles {
	[EnumNameStrategy.ONE_VS_ONE]: IntrSchemaStrategyOneVsOne;
}

@Injectable()
export class ServiceCreateBattles {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(private readonly strategyOneVsOne: StrategyOneVsOne) {
		this.mapStrategies.set(this.strategyOneVsOne.name, this.strategyOneVsOne);
	}

	async create<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyCreateBattles[M]['args']
	): Promise<IntrMapStrategyCreateBattles[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(
				`Стратегия создания истории битвы: ${method}`
			);
		}

		return (await strategy.execute(args)) as IntrMapStrategyCreateBattles[M]['return'];
	}
}
