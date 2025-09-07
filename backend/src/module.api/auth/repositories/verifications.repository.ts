import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EntityVerifications } from "../../../common/entity/reference.scheme/verifications.entity";

@Injectable()
export class VerificationsRepository {
  constructor(
    @InjectRepository(EntityVerifications)
    private repoVerifications: Repository<EntityVerifications>
  ) { }

  async findAll() {
    return await this.repoVerifications.find();
  }
}
