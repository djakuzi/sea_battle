
/**
 * @template R Тип возвращаемого значения callback-функции
 * @returns {R | void} Результат выполнения callback-функции или undefined
 */
export type TypeCallback<R = void, Args extends any[] = []> = (...arg: Args) => R;