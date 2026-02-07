import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { EntityRole } from 'src/common/entity/reference.scheme/role.entity';

@Injectable()
export class RepoRole {
	constructor(
		@InjectRepository(EntityRole)
		private readonly roleRepo: Repository<EntityRole>
	) { }

	async findAll(): Promise<EntityRole[]> {
		const result = await this.roleRepo.find();
		return result;
	}

	createRole(name: string): Promise<EntityRole> {
		const role = this.roleRepo.create({ name });
		return this.roleRepo.save(role);
	}
}
