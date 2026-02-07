import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guard/auth/auth.guard';
import { Request } from 'express';
import { EntityUser } from 'src/common/entity/public.scheme/user.entity';
import { DtoSendRequest } from './dto/sendReguest.dto';
import { DtoApplyRequest } from './dto/applyReguest.dto';
import { DtoCloseRequest } from './dto/closeReguest.dto';
import { DtoMyRequest } from './dto/myReguest.dto';
import { DtoActionList } from './dto/actionList.dto';
import { DtoRemoveFriend } from './dto/removeFriend.dto';
import { ServiceGetFriendAction } from './services/action/getFriendAction.service';
import { ServiceGetReguestFriend } from './services/reguest/getFriendRequest.service';
import { ServiceFindFriendShip } from './services/friendship/findFriendShip.service';
import { ServiceRemoveFriendship } from './services/friendship/removeFriendship.service';
import { ServiceAcceptFriendReguest } from './services/reguest/acceptFriendRequest.service';
import { ServiceRemoveFriendReguest } from './services/reguest/removeFriendRequest.service';
import { ServiceCreateReguestFriend } from './services/reguest/createFriendRequest.service';

@Controller('friends')
export class FriendController {
	constructor(
		private readonly serviceGetReguestFriend: ServiceGetReguestFriend,
		private readonly serviceGetFriendAction: ServiceGetFriendAction,
		private readonly serviceFindFriendship: ServiceFindFriendShip,
		private readonly serviceRemoveFriendship: ServiceRemoveFriendship,
		private readonly serviceCreateFriendRequest: ServiceCreateReguestFriend,
		private readonly serviceAcceptFriendReguest: ServiceAcceptFriendReguest,
		private readonly serviceRemoveFriendReguest: ServiceRemoveFriendReguest
	) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	async getMyFriends(@Req() req: Request) {
		const argsFind = {
			idPlayer: (req.user as EntityUser).player.id,
		};

		return await this.serviceFindFriendship.find(
			ServiceFindFriendShip.strategyName.MORE,
			argsFind
		);
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	async getFriends(@Param('id') id: string) {
		const argsFind = {
			idPlayer: +id,
		};

		return await this.serviceFindFriendship.find(
			ServiceFindFriendShip.strategyName.MORE,
			argsFind
		);
	}

	@Post('send-request')
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	async sendRequest(@Req() req: Request, @Body() dto: DtoSendRequest) {
		const args = {
			data: {
				receiverId: dto.receiverId,
				senderId: (req.user as EntityUser).player.id,
			},
		};

		return await this.serviceCreateFriendRequest.create(
			ServiceCreateReguestFriend.strategyName.DEFAULT,
			args
		);
	}

	@Post('accept-request')
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	async applyRequest(@Body() dto: DtoApplyRequest) {
		return await this.serviceAcceptFriendReguest.accept(
			ServiceAcceptFriendReguest.strategyName.DEFAULT,
			{
				idRequest: dto.idRequest,
			}
		);
	}

	@Post('close-request')
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	async closeRequest(@Body() dto: DtoCloseRequest) {
		return await this.serviceRemoveFriendReguest.remove(
			ServiceRemoveFriendReguest.strategyName.DEFAULT,
			{
				data: { id: +dto.idRequest },
			}
		);
	}

	@Post('remove-friend')
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	async deleteFriend(@Req() req: Request, @Body() dto: DtoRemoveFriend) {
		const args = {
			data: {
				player1Id: dto.idFriend,
				player2Id: (req.user as EntityUser).player.id,
			},
		};

		return await this.serviceRemoveFriendship.remove(
			ServiceRemoveFriendship.strategyName.DEFAULT,
			args
		);
	}

	@Post('my-request')
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	async getMyRequests(@Req() req: Request, @Body() dto: DtoMyRequest) {
		const args = {
			idPlayer: (req.user as EntityUser).player.id,
			type: dto.action,
		};

		return await this.serviceGetReguestFriend.get(
			ServiceGetReguestFriend.strategyName.RECEIVED_REQUESTS,
			args
		);
	}

	@Post('action')
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	async getListAction(@Req() req: Request, @Body() dto: DtoActionList) {
		const args = {
			id: (req.user as EntityUser).player.id,
			list: dto.listIdPlayers,
		};

		return await this.serviceGetFriendAction.get(
			ServiceGetFriendAction.strategyName.LIST_ACTION,
			args
		);
	}
}
