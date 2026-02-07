import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EntityFriendRequest } from 'src/common/entity/game.scheme/friendRequest.entity';
import { IntrResResponse } from 'src/common/types/result-res-api/resultResponse.interface';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { RepoFriendRequest } from 'src/module.api/friends/repositories/friendReguest.repo';
import { ServiceRemoveFriendReguest } from 'src/module.api/friends/services/reguest/removeFriendRequest.service';
import { DataSource, EntityManager } from 'typeorm';

export interface IntrArgsStrategyDefault {
	data: Partial<EntityFriendRequest>;
	manager?: EntityManager;
}

export interface IntrReturnStrategyDefault extends IntrResResponse { }

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
		private readonly repoFriendRequest: RepoFriendRequest
	) { }

	async execute(
		args: IntrSchemaStrategyDefault['args']
	): Promise<IntrSchemaStrategyDefault['return']> {
		return await this.dataSource.transaction(async (manager) => {
			const res = await this.repoFriendRequest.deleteRequest(args.data, manager);
			if (!res) {
				throw new InternalServerErrorException(
					'Произошла ошибка при удалении заявки в друзья'
				);
			}

			if (res.affected === 0) {
				throw new NotFoundException('Данная заявка в друзья не найдена');
			}

			return {
				isSucces: true,
				message: 'Заявка в друзья удалена',
			};
		});
	}
}
