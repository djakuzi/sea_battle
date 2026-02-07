import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { ServiceRole } from './services/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityRole } from 'src/common/entity/reference.scheme/role.entity';
import { EntityRolesUsers } from 'src/common/entity/links.scheme/roles_users.entity';
import { RepoRole } from './repositories/roles.repo';
import { RepoRolesUsers } from './repositories/rolesUsers.repo';
import { ServiceRoleUser } from './services/roleUser.service';

const listRepo = [RepoRolesUsers, RepoRole];

const listService = [ServiceRoleUser, ServiceRole];

@Module({
	imports: [TypeOrmModule.forFeature([EntityRole, EntityRolesUsers])],
	controllers: [RoleController],
	providers: [...listRepo, ...listService],
	exports: [...listRepo, ...listService],
})
export class RoleModule { }
