import { Socket } from "socket.io";
import { ServiceGameSessions } from "../gameSession.service";

export class Emit {
	private core: ServiceGameSessions;

	constructor(core: ServiceGameSessions) {
		this.core = core;
	}

	sessionCreated(client: Socket, idSession: string): void {
		client.emit('sessionCreated', {
			idSession: idSession,
		});
	}
}