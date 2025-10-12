import { devModeConsole } from "@app-common/script/modules/Developer/methods/devModeConsole";
import { CoreOneVsOne } from "../OneVsOne.module";
import { IntrEventGameStart, IntrOnGameStart } from "../types/gameStart.interface";
import { runCallback } from "@app-common/script/utils/callback/method/runCallback";
import { LOG_SESSION_QUEUE } from "@app-core/data/list-log/sessionQueue";
import { EnumEnemy } from "@app-layouts/Battle/types/battle.enum";

export class ServiceCommon {
	private readonly core: CoreOneVsOne;

	constructor(core: CoreOneVsOne) {
		this.core = core;
	}

	reset() {
		this.core.data.idSession = null;
		this.core.data.enemy = null;
		this.core.data.firstMove = null;
		this.core.data.ships = null;
	}
}
