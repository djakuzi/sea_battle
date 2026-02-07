import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { StandartRepository } from 'src/common/repository/standart-repository.repository';
import { EntityStatisticPlayers } from 'src/common/entity/game.scheme/statistic-players.entity';
import { CustomOptionWhere } from 'src/common/types/repository/CustomOptionWhere.type';

@Injectable()
export class StatisticPlayersRepository extends StandartRepository {
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

	async createStatistic(
		idPlayer: number,
		manager?: EntityManager,
		data?: Partial<EntityStatisticPlayers>
	): Promise<EntityStatisticPlayers> {
		const repo = this.getRepo(manager);

		data = {
			player_id: idPlayer,
			...data,
		};

		const res = repo.create(data);

		return await repo.save(res);
	}

	async findOne(
		conditions: CustomOptionWhere<EntityStatisticPlayers>,
		manager?: EntityManager
	): Promise<EntityStatisticPlayers | null> {
		const repo = this.getRepo(manager);

		return await repo.findOne({
			where: conditions,
		});
	}

	async update(
		conditions: CustomOptionWhere<EntityStatisticPlayers>,
		manager?: EntityManager
	): Promise<EntityStatisticPlayers | null> {
		const repo = this.getRepo(manager);

		return await repo.findOne({
			where: conditions,
		});
	}
}
