import { FindOptionsSelect, FindOptionsSelectByString } from 'typeorm';

export type CustomOptionSelect<E> = FindOptionsSelect<E> | FindOptionsSelectByString<E> | undefined;
