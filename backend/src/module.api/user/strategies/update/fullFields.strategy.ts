import { EntityUser } from 'src/common/entity/public.scheme/user.entity';
import { UsersRepository } from '../../repositories/users.repository';
import { EntityManager, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { ServiceUserUpdate } from '../../service/userUpdate.service';

export interface IntrArgsStrategyFullFields {
	idUser: number;
	data: Partial<EntityUser>;
	manager?: EntityManager;
}

export type TypeReturnStrategyFullFields = UpdateResult;

export interface IntrSchemaStrategyFullFields
	extends IntrStandartSchemaStrategy<IntrArgsStrategyFullFields, TypeReturnStrategyFullFields> {
	args: IntrArgsStrategyFullFields;
	return: TypeReturnStrategyFullFields;
}

@Injectable()
export default class StrategyFullFields
	implements IntrStandartStrategy<typeof ServiceUserUpdate.strategyName.FULL_FIELDS> {
	readonly name = ServiceUserUpdate.strategyName.FULL_FIELDS;

	constructor(private readonly repoUsers: UsersRepository) { }

	async execute(
		args: IntrSchemaStrategyFullFields['args']
	): Promise<IntrSchemaStrategyFullFields['return']> {
		const updateResult = await this.repoUsers.updateOne(args.idUser, args.data, args.manager);

		return updateResult;
	}
}
