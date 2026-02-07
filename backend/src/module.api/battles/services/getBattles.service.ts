import { Injectable, NotImplementedException } from "@nestjs/common";
import { IntrSchemaStrategyOneVsOne, StrategyOneVsOne } from "../strategies/get/oneVsOne.strategy";
import { IntrStandartStrategy } from "src/common/types/strategy/standartStrategy.interface";

export enum EnumNameStrategy {
	ONE_VS_ONE = 'ONE_VS_ONE',
}

export interface IntrMapStrategyGetBattles {
	[EnumNameStrategy.ONE_VS_ONE]: IntrSchemaStrategyOneVsOne;
}

@Injectable()
export class ServiceGetBattles {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(private readonly strategyOneVsOne: StrategyOneVsOne) {
		this.mapStrategies.set(this.strategyOneVsOne.name, this.strategyOneVsOne);
	}

	async get<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyGetBattles[M]['args']
	): Promise<IntrMapStrategyGetBattles[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(
				`Стратегия получения иистория битв не найдена: ${method}`
			);
		}

		return (await strategy.execute(args)) as IntrMapStrategyGetBattles[M]['return'];
	}
}
