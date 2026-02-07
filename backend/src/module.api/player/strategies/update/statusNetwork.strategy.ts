import { Injectable } from '@nestjs/common';
import { EntityPlayer } from 'src/common/entity/game.scheme/player.entity';
import { RepoPlayer } from '../../repositories/player.repo';
import {
	IntrStandartSchemaStrategy,
	IntrStandartStrategy,
} from 'src/common/types/strategy/standartStrategy.interface';
import { EntityManager } from 'typeorm';
import { ServicePlayerUpdate } from '../../service/playerUpdate.service';
import { UpdatePlayer, UpdatePlayerData } from '../../interface/UpdatePlayer.interface';
import { ResultUpdateEntity } from 'src/common/types/entity/ResultUpdateEntity.interface';
import { getInfoUpdateEntity } from 'src/common/util/entity/methods/getInfoUpdateEntity';

export interface IntrArgsStrategyStatusNetwork {
	data: UpdatePlayer;
	isOnline: boolean;
	manager?: EntityManager;
}

export type TypeReturnStrategyStatusNetwork = ResultUpdateEntity;

export interface IntrSchemaStrategyStatusNetwork
	extends IntrStandartSchemaStrategy<
		IntrArgsStrategyStatusNetwork,
		TypeReturnStrategyStatusNetwork
	> {
	args: IntrArgsStrategyStatusNetwork;
	return: TypeReturnStrategyStatusNetwork;
}

@Injectable()
export class StrategyStatusNetwork
	implements IntrStandartStrategy<typeof ServicePlayerUpdate.strategyName.STATUS_NETWORK> {
	readonly name = ServicePlayerUpdate.strategyName.STATUS_NETWORK;

	constructor(private readonly repoPlayer: RepoPlayer) { }

	async execute(
		args: IntrSchemaStrategyStatusNetwork['args']
	): Promise<IntrSchemaStrategyStatusNetwork['return']> {
		const options: Partial<EntityPlayer> = {
			is_online: args.isOnline,
			last_online: new Date(),
		};

		const resData: UpdatePlayerData = {
			...args.data,
			options,
		};

		const result = await this.repoPlayer.updateOne(resData, args.manager);

		return getInfoUpdateEntity(result);
	}
}
