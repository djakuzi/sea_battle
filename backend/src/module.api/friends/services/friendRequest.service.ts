import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EntityFriendRequest } from "src/common/entity/game.scheme/friendRequest.entity";
import { buildConditionsFindWhere } from "src/common/util/repository/conditions";
import { DataSource, EntityManager } from "typeorm";
import { FriendshipService } from "./friendship.service";
import { FriendRequestRepository } from "../repositories/friendReguest.repository";
import { IntrFriendRequest } from "src/common/type/friend/friendReguest.interface";
import { IntrResCreatedRequest } from "../interface/service.result/res.CreatedReguest.interface";
import { IntrResAcceptRequest } from "../interface/service.result/res.AcceptReguest.interface";
import { IntrResCloseRequest } from "../interface/service.result/res.CloseReguest.interface";
import { FriendShipRepository } from "../repositories/friendship.repository";
import { IntrResFindRequestByList } from "../interface/service.result/res.FindRequestByList.interface";


@Injectable()
export class FriendRequestService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly serviceFriendship: FriendshipService,
        private readonly repoFriendship: FriendShipRepository,
        private readonly repoFriendRequest: FriendRequestRepository,
    ) { }

    async createRequests(data: IntrFriendRequest, manager?: EntityManager): Promise<IntrResCreatedRequest> {
        const res = await this.repoFriendRequest.createRequest(data, manager);

        if (!res) {
            throw new InternalServerErrorException('Произошла ошибка при создании запроса в друзья');
        }

        return {
            isCreated: true,
            message: "Заявка в друзья отправлена",
            idRequest: res.id,
        };
    }

    async acceptRequests(idRequest: number): Promise<IntrResAcceptRequest> {
        return await this.dataSource.transaction(async (manager) => {
            const friendRequest = await this.findOneRequest(
                {
                    id: idRequest,
                },
                manager
            )

            await this.serviceFriendship.createFriendship(
                {
                    player1Id: friendRequest.senderId,
                    player2Id: friendRequest.receiverId
                },
                manager
            )

            await this.removeRequests({ id: idRequest }, manager);

            return {
                isSucces: true,
                message: 'Заявка в друзья принята',
            }
        })
    }

    async closeRequests(idRequest: number): Promise<IntrResAcceptRequest> {
        return await this.dataSource.transaction(async (manager) => {
            const res = await this.removeRequests({
                id: idRequest
            }, manager);

            if (!res.isSucces) {
                throw new InternalServerErrorException('Что-то пошло не так');
            }

            return {
                isSucces: true,
                message: 'Заявка в друзья принята',
            }
        })
    }

    async removeRequests(data: Partial<EntityFriendRequest>, manager?: EntityManager): Promise<IntrResCloseRequest> {
        const res = await this.repoFriendRequest.deleteRequest(data, manager);
        if (!res) {
            throw new InternalServerErrorException('Произошла ошибка при удалении заявки в друзья');
        }

        if (res.affected === 0) {
            throw new NotFoundException('Данная заявка в друзья не найдена');
        }

        return {
            isSucces: true,
            message: 'Заявка в друзья удалена',
        }
    }

    async findOneRequest(data: Partial<EntityFriendRequest>, manager?: EntityManager): Promise<EntityFriendRequest> {
        const result = await this.repoFriendRequest.findOneRequest(data, manager)

        if (!result) {
            throw new NotFoundException('Данная заявка в друзья не найдена');
        }

        return result;
    }

    async findRequestByList(
        id: number,
        list: number[],
        manager?: EntityManager
    ): Promise<IntrResFindRequestByList> {
        const listRequest = await this.repoFriendRequest.findRequestByList({id, list, manager});

        if (listRequest === null || listRequest?.length === 0) {
            return {
                listRequest: [],
            }
        };

        return {
            listRequest,
        }
    }

    async getReceivedRequests(
        idPlayer: number,
        type: 'incoming-request' | 'outgoing-request',
        manager?: EntityManager
    ): Promise<EntityFriendRequest[]> {
        const filter: Partial<EntityFriendRequest> = {
            receiverId: idPlayer,
        }

        const conditions = buildConditionsFindWhere<EntityFriendRequest, Partial<EntityFriendRequest>>(filter, 'AND');
        if (!conditions) {
            throw new BadRequestException('Некорректные данные запроса. Попробуйте ещё раз.');
        }

        const res = await this.repoFriendRequest.findRequests(conditions, manager);

        if (res === null || res.length === 0) {
            throw new NotFoundException('Заявки не найдены.');
        }

        return res
    }
}