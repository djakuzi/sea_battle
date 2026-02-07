import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository, UpdateResult } from 'typeorm';
import { StandartRepository } from 'src/common/repository/standart-repository.repository';
import { EntityStatisticPlayers } from 'src/common/entity/game.scheme/statistic-players.entity';
import { IntrUpdateByOptions } from '../types/repo/updateByOptions.interface';

@Injectable()
export class RepoUpdate extends StandartRepository {
	constructor(
		private readonly dataSource: DataSource,
		@InjectRepository(EntityStatisticPlayers)
		private readonly repoStatisticPlayers: Repository<EntityStatisticPlayers>
	) {
		super(dataSource);
	}

	getRepo(manager?: EntityManager): Repository<EntityStatisticPlayers> {
		return this.getRepoEntity(EntityStatisticPlayers, this.dataSource, manager);
	}

	async updateOne(
		updateByOptions: IntrUpdateByOptions,
		options: Partial<EntityStatisticPlayers>,
		manager?: EntityManager
	): Promise<UpdateResult>{
		const repo = this.getRepo(manager);
		const isPlayers = updateByOptions.player_id !== undefined;
		const isStats = updateByOptions.id !== undefined;

		const resultCriteri = isPlayers ? { player_id: updateByOptions.player_id } : { id: updateByOptions.id };

		if (!isStats && !isPlayers) {
			throw new ConflictException('Данные для обновления cтатистики игрока не верны или не переданы');
		}
		
		return await repo.update(resultCriteri, options);
	}
}
