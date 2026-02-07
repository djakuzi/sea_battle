
import { RepoCreate } from "./repositories/create.repo";
import { RepoGet } from "./repositories/get.repo";
import { ServiceCreateBattles } from "./services/createBattles.service";
import { ServiceGetBattles } from "./services/getBattles.service";
import { StrategyOneVsOne as StrategyCreateOneVsOne } from "./strategies/create/oneVsOne.strategy";
import { StrategyOneVsOne as StrategyGetOneVsOne } from "./strategies/get/oneVsOne.strategy";

export const SCHEMA_SERVICE_PLAYER = {
	repo: [RepoCreate, RepoGet],
	service: [ServiceCreateBattles, ServiceGetBattles],
	strategy: {
		create: [StrategyCreateOneVsOne],
		get: [StrategyGetOneVsOne],
	},
};
