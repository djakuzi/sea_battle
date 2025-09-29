import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EntityVerificationsUsers } from "src/common/entity/public.scheme/verifications_users.entity";
import { VerificationsUsersRepository } from "src/module.api/auth/repositories/verififcations_users.repository";
import { buildConditionsFindWhere } from "src/common/util/repository/conditions";
import { EntityManager } from "typeorm";
import { IntrVerificationUser } from "../type/VerificationUser.intreface";

@Injectable()
export class ServiceVerififcationUser {
    constructor(
        private readonly repoVerificationUser: VerificationsUsersRepository,
    ) { }

    async getListVerificationUser(userId: number): Promise<IntrVerificationUser[] | null> {
        const res = await this.repoVerificationUser.getUserVerifications(userId);

        return res
    }

    async findVerification(filter: Partial<EntityVerificationsUsers>, manager?: EntityManager): Promise<EntityVerificationsUsers | null> {
        const conditions = buildConditionsFindWhere<EntityVerificationsUsers, typeof filter>(filter, "AND");
        if (!conditions) return null;
        
        const res = await this.repoVerificationUser.findVerificationUser(conditions, manager);
        return res;
    }

    async checkVerificationUser(filter: Partial<EntityVerificationsUsers>, manager?: EntityManager): Promise<boolean> {
        const res = await this.findVerification(filter, manager);
        return res ? true : false;
    }

    async addVerificationByUser(data: Partial<EntityVerificationsUsers>, manager?: EntityManager): Promise<EntityVerificationsUsers | null> {
        const res = await this.repoVerificationUser.createVerificationUser(data, manager);

        if (!res) throw new InternalServerErrorException('Произошла ошибка при создании верификации');
        return res;
    }
}