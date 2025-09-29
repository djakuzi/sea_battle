import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FriendRequestService } from './services/friendRequest.service'
import { AuthGuard } from 'src/common/guard/auth/auth.guard';
import { Request } from 'express';
import { EntityUser } from 'src/common/entity/public.scheme/user.entity';
import { FriendshipService } from './services/friendship.service';
import { DtoSendRequest } from './dto/sendReguest.dto';
import { IntrFriendRequest } from 'src/common/type/friend/friendReguest.interface';
import { DtoApplyRequest } from './dto/applyReguest.dto';
import { DtoCloseRequest } from './dto/closeReguest.dto';
import { DtoMyRequest } from './dto/myReguest.dto';
import { CommonFriendService } from './services/commonFriend.service';
import { DtoActionList } from './dto/actionList.dto';
import { DtoRemoveFriend } from './dto/removeFriend.dto';

@Controller('friends')
export class FriendController {
  constructor(
    private readonly commonFriendService: CommonFriendService,
    private readonly friendRequestService: FriendRequestService,
    private readonly friendShipService: FriendshipService,
  ) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getFriends(@Req() req: Request) {
    return await this.friendShipService.findFriends((req.user as EntityUser).player.id)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getMyFriends(@Param('id') id: string) {
    return await this.friendShipService.findFriends(+id)
  }

  @Post('send-request')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async sendRequest(@Req() req: Request, @Body() dto: DtoSendRequest) {
    const data: IntrFriendRequest = {
      receiverId: dto.receiverId,
      senderId: (req.user as EntityUser).player.id,
    }

    return await this.friendRequestService.createRequests(data);
  }

  @Post('accept-request')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async applyRequest(@Body() dto: DtoApplyRequest) {
    return await this.friendRequestService.acceptRequests(dto.idRequest);
  }

  @Post('close-request')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async closeRequest(@Body() dto: DtoCloseRequest) {
    console.log(dto)
    return await this.friendRequestService.removeRequests({ id: +dto.idRequest })
  }

  @Post('remove-friend')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async deleteFriend(@Req() req: Request, @Body() dto: DtoRemoveFriend) {
    return await this.friendShipService.removeFriend({
      player1Id: dto.idFriend,
      player2Id: (req.user as EntityUser).player.id,
    }, )
  }

  @Post('my-request')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getMyRequests(@Req() req: Request, @Body() dto: DtoMyRequest) {
    return await this.friendRequestService.getReceivedRequests(
      (req.user as EntityUser).player.id,
      dto.action
    )
  }

  @Post('action')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getListAction(@Req() req: Request, @Body() dto: DtoActionList) {

    return await this.commonFriendService.getListAction(
      (req.user as EntityUser).player.id,
      dto.listIdPlayers
    )
  }
}
