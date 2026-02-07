import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { EntityManager } from 'typeorm';
import { RepoCreate } from '../../repositories/create.repo';
import { ServiceCreateBattles } from '../../services/createBattles.service';
import { EntityOneVsOne } from 'src/common/entity/battles.sheme/oneVsOne.entity';

export interface IntrArgsStrategyOneVsOne {
	data: Partial<EntityOneVsOne>;
	manager?: EntityManager;
}

export interface IntrSchemaStrategyOneVsOne extends IntrStandartSchemaStrategy<IntrArgsStrategyOneVsOne, EntityOneVsOne> {
	args: IntrArgsStrategyOneVsOne;
	return: EntityOneVsOne;
}

@Injectable()
export class StrategyOneVsOne
	implements IntrStandartStrategy<typeof ServiceCreateBattles.strategyName.ONE_VS_ONE> {
	readonly name = ServiceCreateBattles.strategyName.ONE_VS_ONE;

	constructor(private readonly repo: RepoCreate) {}

	async execute(
		args: IntrSchemaStrategyOneVsOne['args']
	): Promise<IntrSchemaStrategyOneVsOne['return']> {
		const res = await this.repo.create(args.data, args.manager);

		if (!res) throw new InternalServerErrorException('Произошла ошибка при создании истории битвы');

	
		console.log(`Добавлена новая история битвы One Vs One id: ${res.id}`);
		return res;
	}
}
