import { ConfigService } from "@nestjs/config"

export function isDevMode(configService: ConfigService):boolean {
    return configService.get('mode') === 'DEV';
}

export function isProdMode(configService: ConfigService): boolean {
    return configService.get('mode') === 'PROD';
}

const utilMode = {
    isDevMode,
    isProdMode
}

export default utilMode