import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LIST_FIND_STRATEGIES, ServiceUserFind } from './service/userFind.service';
import { UsersRepository } from 'src/module.api/user/repositories/users.repository';
import { EntityUser } from 'src/common/entity/public.scheme/user.entity';
import { EntityVerificationsUsers } from 'src/common/entity/public.scheme/verifications_users.entity';
import { EntityVerifications } from 'src/common/entity/reference.scheme/verifications.entity';
import { AuthGuardModule } from 'src/common/guard/auth/auth-guard.module';
import { LIST_CHECK_STRATEGIES, ServiceUserCheck } from './service/userCheck.service';
import { LIST_СREATIVE_STRATEGIES, ServiceCreateUser } from './service/userCreate.service';

const LIST_SERVICE = [
  ServiceUserFind,
  ServiceUserCheck,
  ServiceCreateUser,
]

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EntityUser, 
      EntityVerificationsUsers, 
      EntityVerifications,
    ]),
    forwardRef(() => AuthGuardModule),
  ],
  controllers: [UserController],
  providers: [
    UsersRepository,
    ...LIST_SERVICE,
    ...LIST_FIND_STRATEGIES,
    ...LIST_CHECK_STRATEGIES,
    ...LIST_СREATIVE_STRATEGIES,
  ],
  exports: [
    ...LIST_SERVICE,
    UsersRepository
  ],
})
export class UserModule { }
