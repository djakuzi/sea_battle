import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EntityVerificationsUsers } from "src/common/entity/public.scheme/verifications_users.entity";
import { VerificationsUsersRepository } from "src/module.api/auth/repositories/verififcations_users.repository";
import { buildConditionsFindWhere } from "src/common/util/repository/conditions";
import { EntityManager } from "typeorm";

@Injectable()
export class VerififcationUserService {
    constructor(
        private readonly repoVerificationUser: VerificationsUsersRepository,
    ) { }

    async findVerification(filter: Partial<EntityVerificationsUsers>, manager?: EntityManager): Promise<EntityVerificationsUsers | null> {
        const conditions = buildConditionsFindWhere<EntityVerificationsUsers, typeof filter>(filter, "AND");
        if (!conditions) return null;

        const res = await this.repoVerificationUser.findVerificationUser(conditions, manager);
        return res
    }

    async checkVerificationUser(filter: Partial<EntityVerificationsUsers>, manager?: EntityManager): Promise<boolean> {
        const res = await this.findVerification(filter, manager);
        return res ? true : false;
    }

    async addVerificationByUser(data: Partial<EntityVerificationsUsers>, manager?: EntityManager): Promise<EntityVerificationsUsers | null> {
        const res = await this.repoVerificationUser.createVerificationUser(data, manager);

        if (!res) throw new InternalServerErrorException('Произошла ошибка при создании верификации');
        return res
    }
}