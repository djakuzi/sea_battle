import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { FullJwtTokens, JwtPayload } from "../interface/jwt-token.interface";
import { ConfigService } from "@nestjs/config";
import { Backend, Frontend } from "src/module.config/config/configuration";
import { Response } from "express";
import { isDevMode } from "src/common/util/other/mode";
import { UserService } from "src/module.api/user/service/user.service";
import { EntityUser } from "src/common/entity/public.scheme/user.entity";

@Injectable()
export class TokenService {
    private readonly FRONTEND_DOMAIN: string | undefined
    private readonly JWT_ACCESS_TOKEN_TTL: string | undefined
    private readonly JWT_REFRESH_TOKEN_TTL: string | undefined
    constructor(
        private readonly serviceJwt: JwtService,
        private readonly serviceConfig: ConfigService,
        private readonly serviceUser: UserService,
    ) { 
        this.FRONTEND_DOMAIN = this.serviceConfig.get<Frontend>('frontend')?.host;
        this.JWT_ACCESS_TOKEN_TTL = this.serviceConfig.get<Backend>('backend')?.jwt.JWT_ACCESS_TOKEN_TTL;
        this.JWT_REFRESH_TOKEN_TTL = this.serviceConfig.get<Backend>('backend')?.jwt.JWT_REFRESH_TOKEN_TTL;
    }

    generateTokenUser(uuid: string, login: string): FullJwtTokens {
        const payload: JwtPayload = { uuid, login};

        const accessToken = this.serviceJwt.sign(payload, {
            expiresIn: this.JWT_ACCESS_TOKEN_TTL || '1h',
        })

        const refreshToken = this.serviceJwt.sign(payload, {
            expiresIn: this.JWT_REFRESH_TOKEN_TTL || '7d',
        })

        return {
            accessToken,
            refreshToken
        }
    }

    async checkTokenUser(token: string):Promise<EntityUser | null> {
        let payload: JwtPayload | null = null;

        try {
            payload = await this.serviceJwt.verifyAsync<JwtPayload>(token);
        } catch (e) {
            console.log(e);
            throw new NotFoundException('Пользователь не найден');
        }
        
        if (payload) {
            const user = await this.serviceUser.findOneUser({uuid: payload.uuid});

            if (!user) {
                throw new NotFoundException('Пользователь не найден');
            }

            return user
        }

        return null
    }

    setCookie(res: Response, value: string, expires: Date) {
        res.cookie('refreshToken', value, {
            httpOnly: true,
            domain: this.FRONTEND_DOMAIN,
            expires: expires,
            secure: !isDevMode(this.serviceConfig),
            sameSite: !isDevMode(this.serviceConfig) ? 'none' : 'lax',
        })
    }
}