import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { StandartRepository } from 'src/common/repository/standart-repository.repository';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { EntityOneVsOne } from 'src/common/entity/battles.sheme/oneVsOne.entity';
import { CustomOptionWhere } from 'src/common/types/repository/CustomOptionWhere.type';

@Injectable()
export class RepoGet extends StandartRepository {
	constructor(
		private readonly dataSource: DataSource,
		@InjectRepository(EntityOneVsOne)
		private readonly repo: Repository<EntityOneVsOne>
	) {
		super(dataSource);
	}

	getRepo(manager?: EntityManager): Repository<EntityOneVsOne> {
		return this.getRepoEntity(EntityOneVsOne, this.dataSource, manager);
	}

	async getOneVsOne(
		conditions: CustomOptionWhere<EntityOneVsOne>,
	) {
		return await this.repo.find({
			where: conditions,
		});
	}
}
