import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IntrFriendRequest } from 'src/common/types/friend/friendReguest.interface';
import { IntrResCreated } from 'src/common/types/result-res-api/resultCreated.interface';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { FriendRequestRepository } from 'src/module.api/friends/repositories/friendReguest.repository';
import { ServiceRemoveFriendReguest } from 'src/module.api/friends/services/reguest/removeFriendRequest.service';
import { DataSource, EntityManager } from 'typeorm';

export interface IntrArgsStrategyDefault {
	data: IntrFriendRequest;
	manager?: EntityManager;
}

export interface IntrReturnStrategyDefault extends IntrResCreated {
	idRequest: number;
}

export interface IntrSchemaStrategyDefault
	extends IntrStandartSchemaStrategy<IntrArgsStrategyDefault, IntrReturnStrategyDefault> {
	args: IntrArgsStrategyDefault;
	return: IntrReturnStrategyDefault;
}

@Injectable()
export class StrategyDefault
	implements IntrStandartStrategy<typeof ServiceRemoveFriendReguest.strategyName.DEFAULT> {
	readonly name = ServiceRemoveFriendReguest.strategyName.DEFAULT;

	constructor(
		private readonly dataSource: DataSource,
		private readonly repoFriendRequest: FriendRequestRepository
	) { }

	async execute(
		args: IntrSchemaStrategyDefault['args']
	): Promise<IntrSchemaStrategyDefault['return']> {
		const res = await this.repoFriendRequest.createRequest(args.data, args.manager);

		if (!res) {
			throw new InternalServerErrorException(
				'Произошла ошибка при создании запроса в друзья'
			);
		}

		return {
			isCreated: true,
			message: 'Заявка в друзья отправлена',
			idRequest: res.id,
		};
	}
}
