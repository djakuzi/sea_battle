import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
	private readonly logger = new Logger(DatabaseService.name);

	constructor(private readonly dataSource: DataSource) {}

	async onModuleInit() {
		try {
			if (!this.dataSource.isInitialized) {
				await this.dataSource.initialize();
			}
			this.logger.log('Успешное подключение к базе данных');
		} catch (error) {
			this.logger.error('Не удалось подключиться к базе данных' + error);
		}
	}
}
