import { StatisticPlayersRepository } from '../repositories/statistic-players.repository';
import { StrategyDefault } from '../strategies/create/default.strategy';
import { StrategyOne } from '../strategies/find/one.strategy';
import { ServiceUpdateStatisticPlayers } from './updateStatistic.service';
import { ServiceCreativeStatisticPlayer } from './createStatisticPlayer.service';
import { ServiceFindStatisticPlayer } from './findStatisticPlayer.service';

export const SCHEMA_SERVICE_STATISCTIC_PLAYER = {
	repo: [StatisticPlayersRepository],
	service: [
		ServiceUpdateStatisticPlayers,
		ServiceFindStatisticPlayer,
		ServiceCreativeStatisticPlayer,
	],
	strategy: {
		find: [StrategyOne],
		update: [],
		create: [StrategyDefault],
		check: [],
	},
};
