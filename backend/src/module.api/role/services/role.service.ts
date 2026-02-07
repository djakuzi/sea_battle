import { Injectable } from '@nestjs/common';
import { EntityRole } from 'src/common/entity/reference.scheme/role.entity';
import { RepoRole } from '../repositories/roles.repo';

@Injectable()
export class ServiceRole {
	constructor(private readonly roleRepo: RepoRole) { }

	async getAllRoles(): Promise<EntityRole[]> {
		const result = await this.roleRepo.findAll();
		return result;
	}

	async findRoleByUser() { }

	async addNewRoleByUser() { }
}
