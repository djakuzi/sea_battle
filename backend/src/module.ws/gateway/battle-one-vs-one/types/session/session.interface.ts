import { GameOneVsOne } from "src/game/typeGame/OneVsOne";
import { IntrWaitingParticipant } from "../waitingParticipant.interface";

export interface IntrSession {
	id: string,
	startDate: Date,
	endDate: Date | null,
	participants: Record<string, IntrWaitingParticipant>,
	idWinner: string | null,
}

export interface IntrSessionOneVsOne {
	session: IntrSession,
	game: GameOneVsOne | null,
}