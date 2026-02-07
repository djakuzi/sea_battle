import { IntrPlayerWithActionFriend } from "@app-common/types/players/playerWithActionFriend.interface";
import { IntrPlayerFull } from "../../../../../../../common/types/Player.interface";

export interface PropsListPlayer {
	cls?: string;
	isSetBtnFriend?: boolean;
	listPlayers: IntrPlayerWithActionFriend[];
	isScroll?: boolean;
}