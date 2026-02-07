import { EntityManager, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { DataSource } from 'typeorm';

export function getRepo<T extends ObjectLiteral>(
	entity: EntityTarget<T>,
	dataSource: DataSource,
	manager?: EntityManager
): Repository<T> {
	return manager ? manager.getRepository(entity) : dataSource.getRepository(entity);
}

const other = {
	getRepo,
};
export default other;
