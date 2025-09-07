import { ConfigService } from "@nestjs/config";
import { Backend, CorsSettings } from "src/module.config/config/configuration";

export async function getCorsConfig(configService: ConfigService): Promise<CorsSettings | undefined> {
    const configCors = configService.get<Backend>('backend')?.cors;

    return configCors
} 