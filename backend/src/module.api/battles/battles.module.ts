import { AuthGuardModule } from "src/common/guard/auth/auth-guard.module";
import { ControllerBattles } from "./battles.controller";
import { Module } from "@nestjs/common";
import { SCHEME_ENTITY_BATTLES } from "src/common/entity/battles.sheme/scheme";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SCHEMA_SERVICE_PLAYER } from "./schema";
import { unpackSchemaService } from "src/common/util/unpack/schemaService.util";

@Module({
	imports: [
		TypeOrmModule.forFeature(SCHEME_ENTITY_BATTLES), 
		AuthGuardModule,
	],
	controllers: [ControllerBattles],
	providers: [
		...unpackSchemaService(SCHEMA_SERVICE_PLAYER)
	],
	exports: [
		...SCHEMA_SERVICE_PLAYER.repo,
		...SCHEMA_SERVICE_PLAYER.service,
	],
})
export class ModuleBattles {}
