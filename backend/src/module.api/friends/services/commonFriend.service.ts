import { Injectable } from "@nestjs/common";;
import { EntityManager } from "typeorm";
import { IntrResActionFriend } from "../interface/service.result/res.ActionFriend.interface";
import { FriendShipRepository } from "../repositories/friendship.repository";
import { FriendRequestRepository } from "../repositories/friendReguest.repository";
import { FriendshipService } from "./friendship.service";
import { FriendRequestService } from "./friendRequest.service";

@Injectable()
export class CommonFriendService {
    constructor(
        private readonly serviceFriendship: FriendshipService,
        private readonly repoFriendship: FriendShipRepository,
        private readonly friendRequestService: FriendRequestService,
        private readonly repoFriendRequest: FriendRequestRepository,
    ) { }

    async getListAction(
        id: number,
        list: number[],
        manager?: EntityManager,
    ): Promise<IntrResActionFriend> {
        
        const resIsListFriends = await this.serviceFriendship.isFriendsByList(id, list, manager);
        const resListRequest = await this.friendRequestService.findRequestByList(id, list, manager);
        
        const result: IntrResActionFriend['listActions'] = [];

        const friendMap = new Map<number, boolean>();
        for (const item of resIsListFriends.listIsFriends) {
            friendMap.set(item.idPlayer, item.isFriend);
        }

        const requestMap = new Map < number, { idRequest: number; action: 'accept' | 'close' }>();

        for (const req of resListRequest.listRequest) {
            if (!req.id) continue;

            if (req.senderId === id) {
                requestMap.set(req.receiverId!, { idRequest: req.id, action: 'close' });
            } else if (req.receiverId === id) {
                requestMap.set(req.senderId!, { idRequest: req.id, action: 'accept' });
            }
        }

        for (const targetId of list) {
            if (targetId === id) continue;

            if (friendMap.get(targetId)) {
                result.push(
                    { 
                        idRequest: targetId,
                        idPlayer: targetId, 
                        action: 'delete' 
                    }
                );
            } else if (requestMap.has(targetId)) {
                result.push(
                    { 
                        idRequest: requestMap.get(targetId)?.idRequest,
                        idPlayer: targetId, 
                        action: requestMap.get(targetId)!.action,
                    }
                );
            } else {
                result.push({ idPlayer: targetId, action: 'add' });
            }
        }

        return { listActions: result };
    }
}