import { CoreGame } from "../coreGame";
import { IntrConfig } from "../types/config/config.interface";

export interface IntrData {
	firstMoveParticipantId: string | null;
	nextParticipantId: string | null;
}

export class Core {
	protected core: CoreGame;
	private _config: IntrConfig;

	constructor(
		core: CoreGame,
		config: Partial<IntrConfig> = {}
	) {
		this.core = core;

		this._config = {
			isKeepStatistics: true,
			...config
		}
	}

	getOptionsConfig(property: keyof IntrConfig): IntrConfig[keyof IntrConfig] {
		return this._config[property];
	}

	getConfig(): IntrConfig {
		return this._config;
	}

	setConfig(config: Partial<IntrConfig>): void {
		this._config = {
			...this._config,
			...config,
		};
	}
} 

export class Config extends Core {
	constructor(core: CoreGame, config?: Partial<IntrConfig>) {
		super(core, config);
	}

}