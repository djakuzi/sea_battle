import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { StandartRepository } from 'src/common/repository/standart-repository.repository';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { EntityOneVsOne } from 'src/common/entity/battles.sheme/oneVsOne.entity';

@Injectable()
export class RepoCreate extends StandartRepository {
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

	async create(		
		data: Partial<EntityOneVsOne>,
		manager?: EntityManager
	) {
		const repo = this.getRepo(manager);
		const res = repo.create(data);

		return await repo.save(res);
	}
}
