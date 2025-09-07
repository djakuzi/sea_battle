// common/common.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/core/config/jwt.config';
import { ConfigService } from '@nestjs/config';
import { UserModule } from 'src/module.api/user/user.module';
import { TokenService } from 'src/module.api/auth/service/token.service';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: getJwtConfig,
            inject: [ConfigService],
        }),
        UserModule,
    ],
    providers: [AuthGuard, TokenService],
    exports: [AuthGuard, TokenService],
})

export class AuthGuardModule {}