import { ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EntityUser } from "src/common/entity/public.scheme/user.entity";
import { EntityVerificationsUsers } from "src/common/entity/public.scheme/verifications_users.entity";
import { Frontend } from "src/module.config/config/configuration";
import * as argon2 from 'argon2';
import { ServiceVerififcationUser } from "../../service/verification-user.service";

export interface IntrDataEmail {
    password?: string;
    email?: string;
}

@Injectable()
export class StrategyEmailSignIn {
    FRONTEND_DOMAIN: string | undefined
    constructor(
        private readonly serviceConfig: ConfigService,
        private readonly serviceVerificationUser: ServiceVerififcationUser,
    ) {
        this.FRONTEND_DOMAIN = this.serviceConfig.get<Frontend>('frontend')?.host;
    }

    async validate(data: IntrDataEmail) {
        const { email, password } = data;
        let verificationsUsers: EntityVerificationsUsers | null = null;
        let user: EntityUser | null = null

        if (!email) throw new ConflictException('Email не передан');
        if (!password) throw new ConflictException('Пароль не передан');

        verificationsUsers = await this.serviceVerificationUser.findVerification({ email });
        if (!verificationsUsers) throw new NotFoundException('Пользователь с таким email не найден');

        const validPassword = verificationsUsers.password;
        if (!validPassword) throw new NotFoundException('У пользователя пароль не установлен');

        const isValidPassword = await argon2.verify(validPassword, password);
        if (!isValidPassword) throw new NotFoundException('Неверный пароль');

        user = verificationsUsers?.user;

        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }

        return {
            user: user,
        }
    }
}
