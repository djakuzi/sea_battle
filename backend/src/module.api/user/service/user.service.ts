import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/module.api/user/repositories/users.repository';
import { DtoOneUser } from '../dto/UserOne.dto';
import { EntityUser } from 'src/common/entity/public.scheme/user.entity';
import { DtoAllUser } from '../dto/UserAll.dto';
import { buildConditionsFindWhere } from 'src/common/util/repository/conditions';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
    constructor(private readonly repoUsers: UsersRepository) { }

    async findAllUser(filter: Partial<EntityUser>, manager?: EntityManager): Promise<EntityUser[] | null> {
        const conditions = buildConditionsFindWhere<EntityUser, DtoAllUser>(filter, 'OR');
        const user = await this.repoUsers.findAll(!conditions ? undefined : conditions, manager);

        return user;
    }

    async findOneUser(filter: Partial<EntityUser>, manager?: EntityManager): Promise<EntityUser | null> {
        const conditions = buildConditionsFindWhere<EntityUser, DtoOneUser>(filter, 'OR');
        if (!conditions) return null;

        const user = await this.repoUsers.findOne(conditions, manager);

        return user;
    }

    async checkAvailabilityUser(filter: Partial<DtoOneUser>, manager?: EntityManager): Promise<boolean> {
        const conditions = buildConditionsFindWhere<EntityUser, DtoOneUser>(filter, 'OR');

        if (!conditions) return false;

        const user = await this.repoUsers.findOne(conditions, manager);

        return user ? true : false;
    }

    async createUser(data: Partial<EntityUser>, manager?: EntityManager): Promise<EntityUser> {
        return await this.repoUsers.createUser(data, manager);
    }

    async updateOneUser(idUser: number, data: Partial<EntityUser>, manager?: EntityManager) {
        await this.repoUsers.updateOne(idUser, data, manager);
    }

    async updateUser(data) {

    }

    async deleteUser(id) {

    }
}
