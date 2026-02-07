import { StatisticPlayersRepository } from './repositories/statistic-players.repo';
import { StrategyDefault } from './strategies/create/default.strategy';
import { StrategyOne } from './strategies/find/one.strategy';
import { StrategyOneVsOne } from './strategies/update/OneVsOne.strategy';
import { ServiceCreativeStatisticPlayer } from './services/createStatisticPlayer.service';
import { ServiceFindStatisticPlayer } from './services/findStatisticPlayer.service';
import { ServiceUpdateStatisticPlayer } from './services/updateStatisticPlayer.service';
import { RepoUpdate } from './repositories/update.repo';

export const SCHEMA_SERVICE_STATISCTIC_PLAYER = {
	repo: [
		StatisticPlayersRepository,
		RepoUpdate
	],
	service: [
		ServiceFindStatisticPlayer,
		ServiceCreativeStatisticPlayer,
		ServiceUpdateStatisticPlayer,
	],
	strategy: {
		find: [StrategyOne],
		create: [StrategyDefault],
		update: [StrategyOneVsOne],
		check: [],
	},
};
