import { Module } from '@nestjs/common';
import { unpackSchemaService } from 'src/common/util/unpack/schemaService.util';
import { SCHEMA_SERVICE_INFO } from './service/schema';
import { ControllerInfo } from './info.controller';

@Module({
	imports: [],
	controllers: [ControllerInfo],
	providers: [...unpackSchemaService(SCHEMA_SERVICE_INFO)],
	exports: [...SCHEMA_SERVICE_INFO.service],
})
export class ModuleInfo {}
