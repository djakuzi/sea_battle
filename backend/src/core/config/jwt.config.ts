import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";
import { Backend } from "src/module.config/config/configuration";

export async function getJwtConfig(configService: ConfigService): Promise<JwtModuleOptions> {
    return {
        secret: configService.get<Backend>('backend')?.jwt.JWT_SECRET,
        signOptions: {
            algorithm: 'HS256',
        },
        verifyOptions: {
            algorithms: ['HS256'],
            ignoreExpiration: false
        }
    }
} 