import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './services/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityRole } from 'src/common/entity/reference.scheme/role.entity';
import { EntityRolesUsers } from 'src/common/entity/links.scheme/roles_users.entity';
import { RoleRepository } from './repositories/roles.repository';
import { RolesUsersRepository } from './repositories/roles_users.reposotory';
import { RoleUserService } from './services/role_user.service';

const listRepo = [
  RolesUsersRepository,
  RoleRepository,
]

const listService = [
  RoleUserService,
  RoleService,
]

@Module({
  imports: [TypeOrmModule.forFeature([EntityRole, EntityRolesUsers])],
  controllers: [RoleController],
  providers: [
    ...listRepo, 
    ...listService,
  ],
  exports: [
    ...listRepo,
    ...listService,
  ]
})

export class RoleModule { }
