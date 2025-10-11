import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityUser } from 'src/common/entity/public.scheme/user.entity';
import { EntityVerificationsUsers } from 'src/common/entity/public.scheme/verifications_users.entity';
import { EntityVerifications } from 'src/common/entity/reference.scheme/verifications.entity';
import { AuthGuardModule } from 'src/common/guard/auth/auth-guard.module';
import { unpackSchemaService } from 'src/common/util/unpack/schemaService.util';
import { SCHEMA_SERVICE_USER } from './service/schema';

@Module({
	imports: [
		TypeOrmModule.forFeature([EntityUser, EntityVerificationsUsers, EntityVerifications]),
		forwardRef(() => AuthGuardModule),
	],
	controllers: [UserController],
	providers: [...unpackSchemaService(SCHEMA_SERVICE_USER)],
	exports: [...SCHEMA_SERVICE_USER.repo, ...SCHEMA_SERVICE_USER.service],
})
export class UserModule {}
