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

export interface IntrArgsStrategyOne {
	filter: Partial<EntityUser>;
	manager?: EntityManager;
}

export type TypeReturnStrategyOne = EntityUser | null;

export interface IntrSchemaStrategyOne
	extends IntrStandartSchemaStrategy<IntrArgsStrategyOne, TypeReturnStrategyOne> {
	args: IntrArgsStrategyOne;
	return: TypeReturnStrategyOne;
}

@Injectable()
export class StrategyOne implements IntrStandartStrategy<typeof ServiceUserFind.strategyName.ONE> {
	readonly name = ServiceUserFind.strategyName.ONE;

	constructor(private readonly repoUsers: UsersRepository) { }

	async execute(args: IntrSchemaStrategyOne['args']): Promise<IntrSchemaStrategyOne['return']> {
		const conditions = buildConditionsFindWhere<EntityUser, Partial<EntityUser>>(
			args.filter,
			'OR'
		);
		if (!conditions) return null;

		const user = await this.repoUsers.findOne(conditions, args.manager);

		return user;
	}
}
