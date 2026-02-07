import { Injectable } from '@nestjs/common';
import { EntityRolesUsers } from 'src/common/entity/links.scheme/roles_users.entity';
import { buildConditionsFindWhere } from 'src/common/util/repository/conditions';
import { EntityManager } from 'typeorm';
import { RepoRolesUsers } from '../repositories/rolesUsers.repo';

@Injectable()
export class ServiceRoleUser {
	constructor(private readonly roleUserRepo: RepoRolesUsers) { }

	async findRoleByUser(filter, manager: EntityManager): Promise<EntityRolesUsers | null> {
		const conditions = buildConditionsFindWhere<EntityRolesUsers, typeof filter>(filter, 'AND');
		if (!conditions) return null;

		const res = await this.roleUserRepo.findRoleByUser(conditions, manager);
		return res;
	}

	async checkAvailabilityRole(filter, manager?: EntityManager): Promise<boolean> {
		const conditions = buildConditionsFindWhere<EntityRolesUsers, typeof filter>(filter, 'AND');
		if (!conditions) return false;

		const res = await this.roleUserRepo.findRoleByUser(conditions, manager);
		return res ? true : false;
	}

	async addNewRoleByUser() { }
}
