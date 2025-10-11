import { ConfigService } from '@nestjs/config';

export function isDevMode(configService: ConfigService): boolean {
	return configService.get('mode') === 'DEV';
}
