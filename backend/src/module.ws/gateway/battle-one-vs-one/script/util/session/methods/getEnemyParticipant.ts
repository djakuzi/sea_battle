import { IntrSession } from "src/module.ws/gateway/battle-one-vs-one/types/session/session.interface";
import { IntrWaitingParticipant } from "src/module.ws/gateway/battle-one-vs-one/types/waitingParticipant.interface";

export function getEnemyParticipant(session: IntrSession, playerId: string): IntrWaitingParticipant {
	const enemy = Object.values(session.participants).find(participant => participant.data.id !== playerId);

	if (!enemy) {
		throw new Error('Не удалость определить противника');
	}

	return enemy;
}