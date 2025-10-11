import { Injectable } from '@nestjs/common';
import { EntityUser } from '../../../common/entity/public.scheme/user.entity';
import { DataSource, EntityManager, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomOptionWhere } from '../../../common/types/repository/CustomOptionWhere.type';
import { StandartRepository } from 'src/common/repository/standart-repository.repository';

@Injectable()
export class UsersRepository extends StandartRepository<EntityUser> {
	constructor(
		private readonly dataSource: DataSource,
		@InjectRepository(EntityUser)
		private repoUser: Repository<EntityUser>
	) {
		super(dataSource, repoUser);
	}

	getRepo(manager?: EntityManager): Repository<EntityUser> {
		return this.getRepoEntity(EntityUser, this.dataSource, manager);
	}

	async updateOne(
		idUser: number,
		data: Partial<EntityUser>,
		manager?: EntityManager
	): Promise<UpdateResult> {
		const repo = this.getRepo(manager);
		return await repo.update({ id: idUser }, data);
	}

	async findAll(
		conditions: CustomOptionWhere<EntityUser>,
		manager?: EntityManager
	): Promise<EntityUser[] | null> {
		const repo = this.getRepo(manager);
		return await repo.find({
			where: conditions,
			relations: ['roles'],
		});
	}

	async findOne(
		conditions: CustomOptionWhere<EntityUser>,
		manager?: EntityManager
	): Promise<EntityUser | null> {
		const repo = this.getRepo(manager);
		return await repo.findOne({
			where: conditions,
			relations: ['roles', 'verifications', 'player'],
		});
	}

	async createUser(data: Partial<EntityUser>, manager?: EntityManager): Promise<EntityUser> {
		const repo = this.getRepo(manager);
		const res = repo.create(data);

		return await repo.save(res);
	}
}
