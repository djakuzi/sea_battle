import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ModuleInfo } from 'src/module.api/info/info.module';
import { ServiceStandartCron } from './services/standartCron.service';

@Module({
	imports: [
		ScheduleModule.forRoot(),
		ModuleInfo
	],
	providers: [
		ServiceStandartCron
	]
})
export class ModuleCron {}
