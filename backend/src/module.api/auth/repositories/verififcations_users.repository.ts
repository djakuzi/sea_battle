import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityVerificationsUsers } from "../../../common/entity/public.scheme/verifications_users.entity";
import { DataSource, EntityManager, Repository } from "typeorm";
import { getRepo } from "../../../common/util/repository/other";
import { CustomOptionWhere } from "../../../common/type/repository/CustomOptionWhere.type";
import { IntrVerificationUser } from "../type/VerificationUser.intreface";

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

  async getUserVerifications(userId: number): Promise<IntrVerificationUser[]> {
    const repo = getRepo(EntityVerificationsUsers, this.dataSource);

    const result = await repo
      .createQueryBuilder('vu')
      .leftJoin('vu.user', 'user')
      .leftJoin('vu.verification', 'verification')
      .select([
        'user.login AS login',
        'vu.email AS email',
        'verification.name AS verification_name',
      ])
      .where('user.id = :userId', { userId })
      .getRawMany();

    return result as IntrVerificationUser[];
  }
}
