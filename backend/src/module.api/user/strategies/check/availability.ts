import { EntityUser } from 'src/common/entity/public.scheme/user.entity';
import { UsersRepository } from '../../repositories/users.repository';
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { buildConditionsFindWhere } from 'src/common/util/repository/conditions';
import { ServiceUserCheck } from '../../service/userCheck.service';

export interface IntrArgsStrategyAvailability {
	filter: Partial<EntityUser>;
	manager?: EntityManager;
}

export interface IntrSchemaStrategyAvailability
	extends IntrStandartSchemaStrategy<IntrArgsStrategyAvailability, boolean> {
	args: IntrArgsStrategyAvailability;
	return: boolean;
}

@Injectable()
export class StrategyAvailability
	implements IntrStandartStrategy<typeof ServiceUserCheck.strategyName.AVAILABILITY> {
	readonly name = ServiceUserCheck.strategyName.AVAILABILITY;

	constructor(private readonly repoUsers: UsersRepository) { }

	async execute(
		args: IntrSchemaStrategyAvailability['args']
	): Promise<IntrSchemaStrategyAvailability['return']> {
		const conditions = buildConditionsFindWhere<EntityUser, Partial<EntityUser>>(
			args.filter,
			'OR'
		);

		if (!conditions) return false;

		const user = await this.repoUsers.findOne(conditions, args.manager);

		return user ? true : false;
	}
}
