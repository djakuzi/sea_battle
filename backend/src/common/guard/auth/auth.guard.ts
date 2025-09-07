import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from 'src/module.api/auth/service/token.service';
import { extractAccessToken } from '../../util/request/AccessToken.util';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly tokenService: TokenService,
    ) {}

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const accessToken: string | null = extractAccessToken(request);

        if (!accessToken) {
            throw new UnauthorizedException('Токен авторизации не найден.');
        }

        try {
            const user = await this.tokenService.checkTokenUser(accessToken);

            if (!user) {
                throw new UnauthorizedException('Сессия истекла. Войдите заново.');
            }

            request.user = user;
            return true;
        } catch (error) {
            if (error instanceof Error) {
                throw new UnauthorizedException('Ошибка авторизации: ' + error.message);
            } else {
                throw new UnauthorizedException('Ошибка авторизации.');
            }
        }
    }
}