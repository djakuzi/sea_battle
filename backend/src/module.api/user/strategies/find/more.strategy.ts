import { EntityUser } from 'src/common/entity/public.scheme/user.entity';
import { UsersRepository } from '../../repositories/users.repository';
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { buildConditionsFindWhere } from 'src/common/util/repository/conditions';
import { ServiceUserFind } from '../../service/userFind.service';

export interface IntrArgsStrategyMore {
	filter: Partial<EntityUser>;
	manager?: EntityManager;
}

export type TypeReturnStrategyMore = EntityUser[] | null;

export interface IntrSchemaStrategyMore
	extends IntrStandartSchemaStrategy<IntrArgsStrategyMore, TypeReturnStrategyMore> {
	args: IntrArgsStrategyMore;
	return: TypeReturnStrategyMore;
}

@Injectable()
export class StrategyMore
	implements IntrStandartStrategy<typeof ServiceUserFind.strategyName.MORE> {
	readonly name = ServiceUserFind.strategyName.MORE;

	constructor(private readonly repoUsers: UsersRepository) { }

	async execute(args: IntrSchemaStrategyMore['args']): Promise<IntrSchemaStrategyMore['return']> {
		const conditions = buildConditionsFindWhere<EntityUser, Partial<EntityUser>>(
			args.filter,
			'OR'
		);
		const user = await this.repoUsers.findAll(
			!conditions ? undefined : conditions,
			args.manager
		);

		return user;
	}
}
