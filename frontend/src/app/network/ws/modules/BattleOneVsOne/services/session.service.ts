import { CoreOneVsOne } from "../OneVsOne.module";
import { devModeConsole } from "@app-common/script/modules/Developer/methods/devModeConsole";
import { runCallback } from "@app-common/script/utils/callback/method/runCallback";
import { IntrEventSessionCreated, IntrOnSessionCreated } from "../types/sessionCreated.interface";
import { LOG_SESSION_QUEUE } from "@app-core/data/list-log/sessionQueue";

export class ServiceSession {
	private readonly core: CoreOneVsOne;

	constructor(core: CoreOneVsOne) {
		this.core = core;
	}

	onSessionCreated(args: IntrOnSessionCreated): void {
		this.core._onSubscribe('sessionCreated', (event: IntrEventSessionCreated) => {
			devModeConsole('log', `${LOG_SESSION_QUEUE.sessionCreated.log} Id: ${event.idSession}`);

			this.core.data.idSession = event.idSession;
			this.core._emit('sendShipData', {
				idSession: event.idSession,
				ships: args.ships
			})

			this.core.data.ships = args.ships

			runCallback(args.callback);
		});
	}
}
