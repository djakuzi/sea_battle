import { DataSource, EntityManager, EntityTarget, ObjectLiteral, Repository } from "typeorm";

export class StandartRepository<E extends ObjectLiteral> {
    constructor(
        protected readonly database: DataSource,
        protected readonly repo: Repository<E>
    ) {}

    getRepoEntity<T extends ObjectLiteral>(entity: EntityTarget<T>, dataSource: DataSource, manager?: EntityManager): Repository<T> {
      return manager ? manager.getRepository(entity) : dataSource.getRepository(entity);
    }
}