import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { FriendShipRepository } from "../repositories/friendship.repository";
import { IntrIsFriendshipsByList } from "../interface/service.result/res.IsFriendshipByList.interface";
import { IntrResFindFriendship } from "../interface/service.result/res.FindFriendships.interface";
import { IntrCreateFriendship } from "../interface/service.result/res.CreateFriendship.interface";
import { IntrResultRemoved } from "src/common/type/result-res-api/resultRemoved.interface";
import { EntityFriendship } from "src/common/entity/game.scheme/friendShip.entity";

@Injectable()
export class FriendshipService {
    constructor(
        private readonly repoFriendship: FriendShipRepository,
    ) { }

    async createFriendship(data: IntrCreateFriendship, manager?: EntityManager): Promise<{ isCreated: boolean }> {
        const res = await this.repoFriendship.createFriendship(data.player1Id, data.player2Id, manager);

        if (!res) {
            throw new InternalServerErrorException('Произошла ошибка при добавлении в друзья игрока');
        }

        return {
            isCreated: true
        }
    }

    async isFriendsByList(
        id: number, 
        list: number[], 
        manager?: EntityManager
    ): Promise<IntrIsFriendshipsByList> {
        const friendships = await this.repoFriendship.findFriendsByList(
            {
                id,
                list,
                manager
            }
        )

        if (friendships === null || friendships?.length === 0) {
            return {
                listIsFriends: [],
            }
        };

        const friendIds = new Set<number>();
        friendships.forEach(f => {
            const friendId = f.player1Id === id ? f.player2Id : f.player1Id;
            friendIds.add(friendId);
        });

        return {
            listIsFriends: list.map(playerId => ({
                idPlayer: playerId,
                isFriend: friendIds.has(playerId),
            })),
        }

    }

    async removeFriend(
        data: Partial<EntityFriendship>,
        manager?: EntityManager
    ): Promise<IntrResultRemoved> {
        const resDataDelete = {
            id: data.id,
            player1Id: data.player1Id,
            player2Id: data.player2Id
        }
        
        const res = await this.repoFriendship.deleteFriendship(resDataDelete, manager);
        if (!res) {
            throw new InternalServerErrorException('Произошла ошибка при удалении из друзей');
        }

        if (res.affected === 0) {
            throw new NotFoundException('Данная дружба не найдена');
        }

        return {
            isRemoved: true,
            message: 'Удален из друзей',
        }
    }

    async findFriends(idPlayer: number): Promise<IntrResFindFriendship> {
        const res = await this.repoFriendship.findFriendships({
            idPlayer: idPlayer,
            fields: [
                'id',
                'avatar',
                'is_online',
                'last_online',
                'experience',
                'nickname',
            ]
        });

        return {
            friends: res ? res : [],
        }
    }
}