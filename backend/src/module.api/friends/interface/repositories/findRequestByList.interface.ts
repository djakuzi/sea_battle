import { EntityManager } from "typeorm/entity-manager/EntityManager";

export interface IntrFindRequestByList {
    list: number[],
    id: number,
    manager?: EntityManager,
}