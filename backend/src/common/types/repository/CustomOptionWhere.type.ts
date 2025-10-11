import { FindOptionsWhere } from 'typeorm';

/**
 * Условия для фильтрации данных пользователя.
 * Может быть:
 * - Один объект с условиями поиска - WHERE AND.
 * - Массив объектов с условиями поиска - WHERE OR.
 * - Или `undefined`, если нет условий поиска.
 *
 * @type {FindOptionsWhere<EntityUser>[] | FindOptionsWhere<EntityUser> | undefined}
 */
export type CustomOptionWhere<E> = FindOptionsWhere<E>[] | FindOptionsWhere<E> | undefined;
