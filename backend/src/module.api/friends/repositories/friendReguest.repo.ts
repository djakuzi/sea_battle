import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { StandartRepository } from 'src/common/repository/standart-repository.repository';
import { DataSource, DeleteResult, EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { EntityFriendRequest } from 'src/common/entity/game.scheme/friendRequest.entity';
import { CustomOptionWhere } from 'src/common/types/repository/CustomOptionWhere.type';
import { IntrFindRequestByList } from '../interface/repositories/findRequestByList.interface';

@Injectable()
export class RepoFriendRequest extends StandartRepository {
	constructor(
		private readonly dataSource: DataSource,
		@InjectRepository(EntityFriendRequest)
		private readonly repoFriendRequest: Repository<EntityFriendRequest>
	) {
		super(dataSource);
	}

	getRepo(manager?: EntityManager): Repository<EntityFriendRequest> {
		return this.getRepoEntity(EntityFriendRequest, this.dataSource, manager);
	}

	async createRequest(
		data: Partial<EntityFriendRequest>,
		manager?: EntityManager
	): Promise<EntityFriendRequest> {
		if (!data.senderId || !data.receiverId) {
			throw new BadRequestException('Необходимые данные не получены');
		}

		const repo = this.getRepo(manager);
		const res = repo.create(data);

		return await repo.save(res);
	}

	async deleteRequest(
		data: Partial<EntityFriendRequest>,
		manager?: EntityManager
	): Promise<DeleteResult> {
		const repo = this.getRepo(manager);

		return await repo.delete(data);
	}

	async findRequests(
		conditions: CustomOptionWhere<EntityFriendRequest>,
		manager?: EntityManager
	): Promise<EntityFriendRequest[] | null> {
		const repo = this.getRepo(manager);
		const where = conditions;

		return await repo.find({
			where: where,
		});
	}

	async findOneRequest(
		conditions: Partial<EntityFriendRequest>,
		manager?: EntityManager
	): Promise<EntityFriendRequest | null> {
		const repo = this.getRepo(manager);
		const where: FindOptionsWhere<EntityFriendRequest> = conditions;

		return await repo.findOne({
			where,
		});
	}

	async findRequestByList(data: IntrFindRequestByList): Promise<EntityFriendRequest[] | null> {
		const repo = this.getRepo(data.manager);

		return await repo
			.createQueryBuilder('request')
			.where(
				`(request.senderId = :id AND request.receiverId IN (:...list)) 
       OR (request.receiverId = :id AND request.senderId IN (:...list))`,
				{
					id: data.id,
					list: data.list,
				}
			)
			.getMany();
	}
}
