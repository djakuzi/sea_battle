import { EntityStatisticPlayers } from "src/common/entity/game.scheme/statistic-players.entity";
import { EntityUser } from "src/common/entity/public.scheme/user.entity";
import { IntrStandartSchemaStrategy, IntrStandartStrategy } from "src/common/type/strategy/standartStrategy.interface";
import { EntityManager } from "typeorm";
import { EnumNameStrategyCreateUser } from "../../service/userCreate.service";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../repositories/users.repository";

export interface IntrArgsStrategyDefault {
    data: Partial<EntityUser>, 
    manager?: EntityManager
}

export type TypeReturnStrategyDefault = EntityUser;

export interface IntrSchemaStrategyDefault extends IntrStandartSchemaStrategy<IntrArgsStrategyDefault, TypeReturnStrategyDefault> {
    args: IntrArgsStrategyDefault,
    return: TypeReturnStrategyDefault
}

@Injectable()
export class StrategyDefault implements IntrStandartStrategy<EnumNameStrategyCreateUser> {
    readonly name = EnumNameStrategyCreateUser.DEFAULT;

    constructor(
        private readonly repoUsers: UsersRepository,
    ) { }

    async execute(args: IntrSchemaStrategyDefault['args']): Promise<IntrSchemaStrategyDefault['return']> {
        const res = await this.repoUsers.createUser(args.data, args.manager);
        return res;
    }
}