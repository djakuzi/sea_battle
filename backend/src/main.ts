import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { getCorsConfig } from './core/config/cors.config';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function startApp() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);
	const corsOptions = await getCorsConfig(configService);

	if (corsOptions) {
		app.enableCors(corsOptions);
	}

	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe({
		transform: true,
		whitelist: true,
		forbidNonWhitelisted: false,
	}));
	await app.listen(process.env.BACKEND_PORT ?? 3000);
}

startApp();
