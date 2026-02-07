import { IntrPlayerWithActionFriend } from "@app-common/types/players/playerWithActionFriend.interface";

export interface PropsCardPlayer {
    cls?: string;
    player: IntrPlayerWithActionFriend;
    isSetBtnFriend: boolean;
}