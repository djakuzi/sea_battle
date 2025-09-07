import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { getCorsConfig } from './core/config/cors.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const api = await NestFactory.create(AppModule);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call

  const configService = api.get(ConfigService);
  const corsOptions = await getCorsConfig(configService);

  if (corsOptions) {
    api.enableCors(corsOptions);
  }

  api.use(cookieParser());
  await api.listen(process.env.BACKEND_PORT ?? 3000);
}

bootstrap().then(() => console.log('START SUCCES'));
