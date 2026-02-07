type PropetryEnv = string | undefined;

interface ConfigStandart {
	host: PropetryEnv;
	port: PropetryEnv;
}

export interface Database extends ConfigStandart {
	type: PropetryEnv;
	username: PropetryEnv;
	password: PropetryEnv;
	name: PropetryEnv;
}

export interface Backend extends ConfigStandart {
	jwt: Jwt;
	cors: CorsSettings;
}

export interface Frontend extends ConfigStandart {}

export interface Jwt {
	JWT_SECRET: PropetryEnv;
	JWT_ACCESS_TOKEN_TTL: PropetryEnv;
	JWT_REFRESH_TOKEN_TTL: PropetryEnv;
}

export interface ConfigProject {
	mode: PropetryEnv;
	database: Database;
	backend: Backend;
	frontend: Frontend;
}

export interface CorsSettings {
	enabled: boolean;
	origin: string[];
	methods: string[];
	allowedHeaders: string[];
	credentials: boolean;
	preflightContinue: boolean;
	optionsSuccessStatus: number;
}

const createConfig = (): ConfigProject => ({
	mode: process.env.NODE_MODE || 'DEV',
	database: {
		type: process.env.DATABASE_TYPE,
		name: process.env.DATABASE_NAME,
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
	},
	backend: {
		host: process.env.BACKEND_HOST,
		port: process.env.BACKEND_PORT,
		jwt: {
			JWT_SECRET: process.env.JWT_SECRET,
			JWT_ACCESS_TOKEN_TTL: process.env.JWT_ACCESS_TOKEN_TTL,
			JWT_REFRESH_TOKEN_TTL: process.env.JWT_REFRESH_TOKEN_TTL,
		},
		cors: {
			enabled: process.env.CORS_ENABLED === 'true',
			origin: process.env.FRONTEND_HOST
				? [`http://${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`]
				: ['http://localhost:4000'],
			methods: process.env.CORS_METHODS?.split(',') || [
				'GET',
				'POST',
				'PUT',
				'DELETE',
				'OPTIONS',
			],
			allowedHeaders: process.env.CORS_ALLOWED_HEADERS?.split(',') || [
				'Content-Type',
				'Authorization',
			],
			credentials: process.env.CORS_CREDENTIALS !== 'false',
			preflightContinue: false,
			optionsSuccessStatus: 204,
		},
	},
	frontend: {
		port: process.env.FRONTEND_PORT,
		host: process.env.FRONTEND_HOST,
	},
});

export default createConfig;
