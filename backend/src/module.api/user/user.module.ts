import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './service/user.service';
import { UsersRepository } from 'src/module.api/user/repositories/users.repository';
import { EntityUser } from 'src/common/entity/public.scheme/user.entity';
import { EntityVerificationsUsers } from 'src/common/entity/public.scheme/verifications_users.entity';
import { EntityVerifications } from 'src/common/entity/reference.scheme/verifications.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntityUser, EntityVerificationsUsers, EntityVerifications])],
  controllers: [UserController],
  providers: [UserService, UsersRepository],
  exports: [
    UserService,
    UsersRepository
  ],
})
export class UserModule { }
