import { Injectable } from '@nestjs/common';
import { EntityRole } from 'src/common/entity/reference.scheme/role.entity';
import { RoleRepository } from '../repositories/roles.repository';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepo: RoleRepository
  ) { }

  async getAllRoles(): Promise<EntityRole[]> {
    const result = await this.roleRepo.findAll();
    return result;
  }

  async findRoleByUser() {

  }

  async addNewRoleByUser() {

  }
}
