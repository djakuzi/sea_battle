import { Socket } from "socket.io";
import { TypePlayerType } from "src/common/types/player/typePlayer.type";

export interface IntrWaitingParticipant {
	client: Socket;
	data: {
		id: string;
		nickname: string;
		experience: number;
		type: TypePlayerType,
	},
}