import { EntityUser } from "src/common/entity/public.scheme/user.entity";
import { UsersRepository } from "../../repositories/users.repository";
import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { IntrStandartSchemaStrategy, IntrStandartStrategy } from "src/common/type/strategy/standartStrategy.interface";
import { buildConditionsFindWhere } from "src/common/util/repository/conditions";
import { EnumNameStrategyFindUser } from "../../service/userFind.service";


export interface IntrArgsStrategyMe {
    id: number, 
    manager?: EntityManager
}

export type TypeReturnStrategyMe = EntityUser | null;

export interface IntrSchemaStrategyMe extends IntrStandartSchemaStrategy<IntrArgsStrategyMe, TypeReturnStrategyMe> {
    args: IntrArgsStrategyMe,
    return: TypeReturnStrategyMe
}

@Injectable()
export class StrategyMe implements IntrStandartStrategy<EnumNameStrategyFindUser> {
    readonly name = EnumNameStrategyFindUser.ME;

    constructor(
        private readonly repoUsers: UsersRepository,
    ) { }

    async execute(args: IntrSchemaStrategyMe['args']): Promise<IntrSchemaStrategyMe['return']> {
        const userFilter = {
            id: args.id
        }
        
        const conditions = buildConditionsFindWhere<EntityUser, Partial<EntityUser>>(userFilter, 'OR');
        if (!conditions) return null;

        const user = await this.repoUsers.findOne(conditions, args.manager);

        return user;
    }
}