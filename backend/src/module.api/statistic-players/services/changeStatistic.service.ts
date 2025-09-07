import { Injectable } from "@nestjs/common";
import { StatisticPlayersRepository } from "../repositories/statistic-players.repository";

@Injectable()
export class ChangeStatisticPlayersService {
    constructor(
        private readonly repoStatistic: StatisticPlayersRepository,
    ){}

}