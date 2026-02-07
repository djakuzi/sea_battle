import { DataSource, EntityManager, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

export class StandartRepository {
	constructor(
		protected readonly database: DataSource,
	) {}

	getRepoEntity<T extends ObjectLiteral>(
		entity: EntityTarget<T>,
		dataSource: DataSource,
		manager?: EntityManager
	): Repository<T> {
		return manager ? manager.getRepository(entity) : dataSource.getRepository(entity);
	}
}
