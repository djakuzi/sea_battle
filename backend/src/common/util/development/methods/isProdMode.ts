import { ConfigService } from '@nestjs/config';

export function isProdMode(configService: ConfigService): boolean {
	return configService.get('mode') === 'PROD';
}