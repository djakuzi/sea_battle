import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityVerificationsUsers } from "../../../common/entity/public.scheme/verifications_users.entity";
import { DataSource, EntityManager, Repository } from "typeorm";
import { getRepo } from "../../../common/util/repository/other";
import { CustomOptionWhere } from "../../../common/type/repository/CustomOptionWhere.type";

@Injectable()
export class VerificationsUsersRepository {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(EntityVerificationsUsers)
    private repoVerificationsUsers: Repository<EntityVerificationsUsers>
  ) { }

  async createVerificationUser(data: Partial<EntityVerificationsUsers>, manager?: EntityManager): Promise<EntityVerificationsUsers | null> {
    const repo = getRepo(EntityVerificationsUsers, this.dataSource, manager);
    const res = repo.create(data);

    return await repo.save(res);
  }

  async findVerificationUser(conditions: CustomOptionWhere<EntityVerificationsUsers>, manager?: EntityManager): Promise<EntityVerificationsUsers | null> {
    const repo = getRepo(EntityVerificationsUsers, this.dataSource, manager);
    const res = await repo.findOne({
      where: conditions,
      relations: ['user']
    })

    return res;
  }
}
