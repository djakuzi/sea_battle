import { IntrActionFriend } from "../friends/actionFriend.interface";
import { IntrPlayerFull } from "../Player.interface";

export interface IntrPlayerWithActionFriend extends IntrPlayerFull {
    actionFriends?: IntrActionFriend,
}