import { DataSource, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { EntityRolesUsers } from 'src/common/entity/links.scheme/roles_users.entity';
import { getRepo } from 'src/common/util/repository/other';
import { CustomOptionWhere } from 'src/common/types/repository/CustomOptionWhere.type';

@Injectable()
export class RepoRolesUsers {
	constructor(
		private readonly dataSource: DataSource,
		@InjectRepository(EntityRolesUsers)
		private readonly roleUserRepo: Repository<EntityRolesUsers>
	) { }

	async addRoleByUser(data: EntityRolesUsers, manager: EntityManager) {
		const repo = getRepo(EntityRolesUsers, this.dataSource, manager);
		const res = repo.create(data);

		return await repo.save(res);
	}

	async findRoleByUser(
		conditions: CustomOptionWhere<EntityRolesUsers>,
		manager?: EntityManager
	): Promise<EntityRolesUsers | null> {
		const repo = getRepo<EntityRolesUsers>(EntityRolesUsers, this.dataSource, manager);
		const res = await repo.findOne({
			where: conditions,
		});

		return res;
	}
}
