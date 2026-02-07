import { Injectable, NotImplementedException } from '@nestjs/common';
import {
	IntrSchemaStrategyListAction,
	StrategyListAction,
} from '../../strategies/action/get/listAction.strategy';
import { IntrStandartStrategy } from 'src/common/types/strategy/standartStrategy.interface';

export enum EnumNameStrategy {
	LIST_ACTION = 'list-action',
}

export interface IntrMapStrategyGetFriendAction {
	[EnumNameStrategy.LIST_ACTION]: IntrSchemaStrategyListAction;
}

@Injectable()
export class ServiceGetFriendAction {
	static strategyName = EnumNameStrategy;
	private mapStrategies = new Map<EnumNameStrategy, IntrStandartStrategy<EnumNameStrategy>>();

	constructor(private readonly strategyActionList: StrategyListAction) {
		this.mapStrategies.set(this.strategyActionList.name, this.strategyActionList);
	}

	async get<M extends EnumNameStrategy>(
		method: M,
		args: IntrMapStrategyGetFriendAction[M]['args']
	): Promise<IntrMapStrategyGetFriendAction[M]['return']> {
		const strategy = this.mapStrategies.get(method);

		if (!strategy) {
			throw new NotImplementedException(
				`Стратегия получения взаимодействия с друзьями не найдена: ${method}`
			);
		}

		return (await strategy.execute(args)) as IntrMapStrategyGetFriendAction[M]['return'];
	}
}
