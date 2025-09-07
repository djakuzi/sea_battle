import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './services/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityRole } from 'src/common/entity/reference.scheme/role.entity';
import { EntityRolesUsers } from 'src/common/entity/links.scheme/roles_users.entity';
import { RoleRepository } from './repositories/roles.repository';


@Module({
  imports: [TypeOrmModule.forFeature([EntityRole, EntityRolesUsers])],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
})
export class RoleModule { }
