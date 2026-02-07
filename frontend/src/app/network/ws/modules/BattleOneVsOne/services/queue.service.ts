import { TypeCallback } from "@app-common/types/typeCallback.type";
import { CoreOneVsOne } from "../OneVsOne.module";
import { devModeConsole } from "@app-common/script/modules/Developer/methods/devModeConsole";
import { runCallback } from "@app-common/script/utils/callback/method/runCallback";
import { LOG_SESSION_QUEUE } from "@app-core/data/list-log/sessionQueue";

export class ServiceQueue {
	private readonly core: CoreOneVsOne;

	constructor(core: CoreOneVsOne) {
		this.core = core;
	}

	onConnect(callback?: TypeCallback): void {
		this.core._onSubscribe('connect', () => {
			devModeConsole('log', LOG_SESSION_QUEUE.connected.log);

			runCallback(callback);
		});
	}

	
}
