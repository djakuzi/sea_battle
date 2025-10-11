import { Provider } from '@nestjs/common';
import { IntrSchemaService } from 'src/common/types/service/schemaService';

export function unpackSchemaService(schema: IntrSchemaService): Provider[] {
	const providers: Provider[] = [];

	if (schema?.repo && schema.repo.length > 0) {
		providers.push(...schema.repo);
	}
	if (schema.service && schema.service.length > 0) {
		providers.push(...schema.service);
	}

	if (schema.strategy) {
		Object.values(schema.strategy).forEach((strategies: any[]) => {
			providers.push(...strategies);
		});
	}

	return providers;
}
