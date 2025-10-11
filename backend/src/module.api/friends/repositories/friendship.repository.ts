import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { StandartRepository } from 'src/common/repository/standart-repository.repository';
import { DataSource, DeleteResult, EntityManager, Repository } from 'typeorm';
import { EntityFriendship } from '../../../common/entity/game.scheme/friendShip.entity';
import { IntrFindFriendship } from '../interface/repositories/findFriendships.interface';
import { EntityPlayer } from 'src/common/entity/game.scheme/player.entity';
import { IntrFindFriendsByList } from '../interface/repositories/findFriendsByList.interface';

@Injectable()
export class FriendShipRepository extends StandartRepository<EntityFriendship> {
	constructor(
		private readonly dataSource: DataSource,
		@InjectRepository(EntityFriendship)
		private readonly repoFriendshp: Repository<EntityFriendship>
	) {
		super(dataSource, repoFriendshp);
	}

	getRepo(manager?: EntityManager): Repository<EntityFriendship> {
		return this.getRepoEntity(EntityFriendship, this.dataSource, manager);
	}

	async createFriendship(
		player1Id: number,
		player2Id: number,
		manager?: EntityManager
	): Promise<EntityFriendship> {
		const repo = this.getRepo(manager);

		const [resPlayer1Id, resPlayer2Id] = [
			Math.min(player1Id, player2Id),
			Math.max(player1Id, player2Id),
		];

		const friendship = repo.create({
			player1Id: resPlayer1Id,
			player2Id: resPlayer2Id,
		});

		return await repo.save(friendship);
	}

	async deleteFriendship(
		data: Partial<EntityFriendship>,
		manager?: EntityManager
	): Promise<DeleteResult> {
		const repo = this.getRepo(manager);

		if (data.player1Id && data.player2Id) {
			return await repo.delete([
				{ player1Id: data.player1Id, player2Id: data.player2Id },
				{ player1Id: data.player2Id, player2Id: data.player1Id },
			]);
		}

		return await repo.delete(data);
	}

	async findFriendsByList(data: IntrFindFriendsByList): Promise<EntityFriendship[] | null> {
		const repo = this.getRepo(data.manager);
		const friendships = await repo
			.createQueryBuilder('friendship')
			.where(
				`
                (friendship.player1Id = :id AND friendship.player2Id IN (:...list))
                OR
                (friendship.player2Id = :id AND friendship.player1Id IN (:...list))`,
				{ id: data.id, list: data.list }
			)
			.getMany();

		return friendships;
	}

	async findFriendships(data: IntrFindFriendship): Promise<Partial<EntityPlayer>[]> {
		const repo = this.getRepo(data.manager);

		const qb = repo
			.createQueryBuilder('friendship')
			.leftJoin(
				EntityPlayer,
				'friend',
				`(
                (friend.id = friendship.player1Id AND friendship.player2Id = :idPlayer)
                OR
                (friend.id = friendship.player2Id AND friendship.player1Id = :idPlayer)
            )`,
				{ idPlayer: data.idPlayer }
			)
			.select(data.fields.map((field) => `friend.${field}`));

		const raw = await qb.getRawMany<Record<string, unknown>>();

		return raw.map((row) => {
			const player = {};

			for (const field of data.fields) {
				const key = `friend_${field}` as keyof EntityPlayer;

				if (typeof row[key] === 'undefined') {
					continue;
				}

				player[field] = row[key];
			}

			return player;
		});
	}
}
