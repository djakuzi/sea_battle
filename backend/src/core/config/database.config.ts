import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SCHEME_ENTITY_BATTLES } from 'src/common/entity/battles.sheme/scheme';
import { SCHEME_ENTITY_GAME } from 'src/common/entity/game.scheme/scheme';
import { SCHEME_ENTITY_LINK } from 'src/common/entity/links.scheme/scheme';
import { SCHEME_ENTITY_PUBLIC } from 'src/common/entity/public.scheme/scheme';
import { SCHEME_ENTITY_REFERENCE } from 'src/common/entity/reference.scheme/scheme';
import { Database } from 'src/module.config/config/configuration';

export async function getDatabaseConfig(
	configService: ConfigService
): Promise<TypeOrmModuleOptions> {
	const dbConfig = configService.get<Database>('database');

	if (dbConfig?.type !== 'postgres') {
		throw new Error('Type database not correct: ' + dbConfig?.type);
	}

	return {
		applicationName: 'Backend SeaBattle',
		type: dbConfig?.type,
		host: dbConfig?.host,
		port: +(dbConfig?.port || '5432'),
		username: dbConfig?.username,
		password: dbConfig?.password,
		database: dbConfig?.name,
		entities: [
			...SCHEME_ENTITY_BATTLES,
			...SCHEME_ENTITY_GAME,
			...SCHEME_ENTITY_LINK,
			...SCHEME_ENTITY_PUBLIC,
			...SCHEME_ENTITY_REFERENCE,
		],
		retryAttempts: 10,
		retryDelay: 1000,
		maxQueryExecutionTime: 5000,
		logging: true,
		logger: 'file',
		cache: {
			duration: 60000, // 60 seconds
		},
	};
}
