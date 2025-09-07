import { FindOptionsWhere } from "typeorm";

/**
 * Создаёт условия для опции where в TypeORM.
 * Если type = 'OR' — возвращает массив условий (OR).
 * Если type = 'AND' — возвращает один объект условий (AND).
 *
 * @template E - Entity
 * @template F - Фильтр
 * @param filter Объект фильтра
 * @param type Тип логики объединения условий ('AND' | 'OR'), по умолчанию 'OR'
 * @returns Условия для where или null, если фильтр пуст
 */
export function buildConditionsFindWhere<E, F extends Partial<Record<keyof E, any>>>(
  filter: F,
  type: 'AND' | 'OR' = 'OR'
): FindOptionsWhere<E>[] | FindOptionsWhere<E> | null {
  const conditions: FindOptionsWhere<E>[] = [];
  const andCondition: FindOptionsWhere<E> = {} as FindOptionsWhere<E>;
  const isTypeOr = type === 'OR';

  for (const rawKey in filter) {
    const key = rawKey as unknown as keyof E;
    const value = filter[key];

    if (value === undefined || value === null) continue;

    if (isTypeOr) {
      conditions.push({ [key]: value } as FindOptionsWhere<E>);
    } else {
      andCondition[key] = value;
    }
  }

  if (isTypeOr) {
    return conditions.length === 0 ? null : conditions;
  } else {
    return Object.keys(andCondition).length === 0 ? null : andCondition;
  }
}

const utilConditions = {
  buildConditionsFindWhere,
};


export default utilConditions; 