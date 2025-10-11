import { CoreGame } from "../coreGame";

export interface IntrData {
	firstMoveParticipantId: string | null;
	nextParticipantId: string | null;
}

export class Core {
	protected core: CoreGame;
	protected data: IntrData = {
		firstMoveParticipantId: null,
		nextParticipantId: null
	}

	constructor(core: CoreGame) {
		this.core = core;
	}

	getInfo(property: keyof IntrData): string | null {
		return this.data[property];
	}
} 

export class Move extends Core {
	constructor(core: CoreGame) {
		super(core);
	}

	determineFirstMove(): string {
		const participantsArray = Array.from(this.core.participants.values());

		const randomIndex = Math.floor(Math.random() * participantsArray.length);
		this.data.firstMoveParticipantId = participantsArray[randomIndex].id;
		this.data.nextParticipantId = participantsArray[randomIndex].id;

		console.log(`Первый ходит: ${this.data.firstMoveParticipantId}`);

		return this.data.firstMoveParticipantId;
	}

	isPlayerTurn(id: string): boolean {
		return this.data.nextParticipantId === id;
	}

	switchTurn(): void {
		const participantsArray = Array.from(this.core.participants.values());
		const currentPlayerIndex = participantsArray.findIndex(p => p.id === this.data.nextParticipantId);

		const nextPlayerIndex = (currentPlayerIndex + 1) % participantsArray.length;
		this.data.nextParticipantId = participantsArray[nextPlayerIndex].id;
		console.log(`Теперь ходит: ${this.data.nextParticipantId}`);
	}
}