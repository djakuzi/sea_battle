import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import createConfig from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [createConfig],
    }),
  ],
})
export class ConfigAppModule {}
