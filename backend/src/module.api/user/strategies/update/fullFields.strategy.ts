import { EntityUser } from "src/common/entity/public.scheme/user.entity";
import { UsersRepository } from "../../repositories/users.repository";
import { EntityManager, UpdateResult } from "typeorm";
import { Injectable } from "@nestjs/common";
import { EnumNameStrategyUpdateUser } from "../../service/userUpdate.service";
import { IntrStandartSchemaStrategy, IntrStandartStrategy } from "src/common/type/strategy/standartStrategy.interface";


export interface IntrArgsStrategyFullFields {
    idUser: number, 
    data: Partial<EntityUser>, 
    manager?: EntityManager
}

export type TypeReturnStrategyFullFields = UpdateResult;

export interface IntrSchemaStrategyFullFields extends IntrStandartSchemaStrategy<IntrArgsStrategyFullFields, TypeReturnStrategyFullFields> {
    args: IntrArgsStrategyFullFields,
    return: TypeReturnStrategyFullFields
}

@Injectable()
export class StrategyFullFields implements IntrStandartStrategy<EnumNameStrategyUpdateUser> {
    readonly name = EnumNameStrategyUpdateUser.FULL_FIELDS;

    constructor(
        private readonly repoUsers: UsersRepository,
    ) { }

    async execute(args: IntrSchemaStrategyFullFields['args']): Promise<IntrSchemaStrategyFullFields['return']> {
        const updateResult = await this.repoUsers.updateOne(
            args.idUser,
            args.data,
            args.manager
        );

        return updateResult;
    }
}