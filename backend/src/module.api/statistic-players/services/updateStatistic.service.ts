import { Injectable } from '@nestjs/common';
import { StatisticPlayersRepository } from '../repositories/statistic-players.repository';

export enum EnumNameStrategy {}

@Injectable()
export class ServiceUpdateStatisticPlayers {
	static strategyName = EnumNameStrategy;
	constructor(private readonly repoStatistic: StatisticPlayersRepository) {}

	update() {}
}
