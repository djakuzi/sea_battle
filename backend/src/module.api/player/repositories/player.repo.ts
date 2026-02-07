import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
	DataSource,
	EntityManager,
	FindOptionsWhere,
	ILike,
	Repository,
	UpdateResult,
} from 'typeorm';
import { StandartRepository } from 'src/common/repository/standart-repository.repository';
import { UpdatePlayerData } from 'src/module.api/player/interface/UpdatePlayer.interface';
import { EntityPlayer } from 'src/common/entity/game.scheme/player.entity';
import { CustomOptionSelect } from 'src/common/types/repository/CustomOptionSelect.type';
import { CustomOptionWhere } from 'src/common/types/repository/CustomOptionWhere.type';

@Injectable()
export class RepoPlayer extends StandartRepository {
	constructor(
		private readonly dataSource: DataSource,
		@InjectRepository(EntityPlayer)
		private readonly repoPlayer: Repository<EntityPlayer>
	) {
		super(dataSource);
	}

	getRepo(manager?: EntityManager): Repository<EntityPlayer> {
		return this.getRepoEntity(EntityPlayer, this.dataSource, manager);
	}

	async updateOne(data: UpdatePlayerData, manager?: EntityManager): Promise<UpdateResult> {
		const repo = this.getRepo(manager);

		const isPlayers = data.typeEntityId === 'players';
		const isUsers = data.typeEntityId === 'users';
		const resultCriteri = isUsers ? { user_id: data.id } : { id: data.id };

		if ((!isUsers && !isPlayers) || !data.id) {
			throw new ConflictException('Данные для обновления игрока не верны или не переданы');
		}

		return await repo.update(resultCriteri, data.options);
	}

	async findPlayers(
		conditions: Partial<EntityPlayer>,
		manager?: EntityManager
	): Promise<EntityPlayer[] | null> {
		try {
			const repo = this.getRepo(manager);
			const where: FindOptionsWhere<EntityPlayer> | FindOptionsWhere<EntityPlayer>[] = {};

			if (conditions?.nickname) {
				where.nickname = ILike(`%${conditions.nickname}%`);
			}

			return await repo.find({
				where,
			});
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async findOne(
		conditions: CustomOptionWhere<EntityPlayer>,
		manager?: EntityManager,
		select?: CustomOptionSelect<EntityPlayer>
	): Promise<EntityPlayer | null> {
		const repo = this.getRepo(manager);

		return await repo.findOne({
			select: select,
			where: conditions,
		});
	}

	async createPlayer(
		data: Partial<EntityPlayer>,
		manager?: EntityManager
	): Promise<EntityPlayer> {
		const repo = this.getRepo(manager);
		const res = repo.create(data);

		return await repo.save(res);
	}
}
