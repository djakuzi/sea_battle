import { CoreOneVsOne } from "../OneVsOne.module";

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
