import { Provider } from '@nestjs/common';
import { IntrSchemaWebsocket } from 'src/common/types/websocket/schemaWebsocket';

// Обновим типы для более строгой проверки
export function unpackSchemaWebsocket(schema: IntrSchemaWebsocket): Provider[] {
	const providers: Provider[] = [];

	if (schema?.gateway?.length) {
		providers.push(...schema.gateway);
	}

	if (schema?.dependencies?.length) {
		providers.push(...schema.dependencies);
	}

	if (schema?.service) {
		Object.entries(schema.service).forEach(([moduleKey, services]: [string, any[]]) => {
			if (services?.length) {
				providers.push(...services);
			}
		});
	}

	return providers;
}
