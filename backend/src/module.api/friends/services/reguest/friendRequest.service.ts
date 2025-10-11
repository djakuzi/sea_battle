import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EntityFriendRequest } from 'src/common/entity/game.scheme/friendRequest.entity';
import { DataSource, EntityManager } from 'typeorm';
import { FriendRequestRepository } from '../../repositories/friendReguest.repository';
import { IntrFriendRequest } from 'src/common/types/friend/friendReguest.interface';
import { IntrResCreatedRequest } from '../../interface/service.result/res.CreatedReguest.interface';
import { IntrResAcceptRequest } from '../../interface/service.result/res.AcceptReguest.interface';
import { IntrResCloseRequest } from '../../interface/service.result/res.CloseReguest.interface';
import { ServiceFindReguestFriend } from './findFriendRequest.service';
import { ServiceCreateFriendship } from '../friendship/createFriendShip.service';

@Injectable()
export class ServiceFriendRequest {
	constructor(private readonly repoFriendRequest: FriendRequestRepository) { }

	async createRequests(
		data: IntrFriendRequest,
		manager?: EntityManager
	): Promise<IntrResCreatedRequest> {
		const res = await this.repoFriendRequest.createRequest(data, manager);

		if (!res) {
			throw new InternalServerErrorException(
				'Произошла ошибка при создании запроса в друзья'
			);
		}

		return {
			isCreated: true,
			message: 'Заявка в друзья отправлена',
			idRequest: res.id,
		};
	}
}
