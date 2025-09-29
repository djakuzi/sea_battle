export interface IntrStandartStrategy<Names> {
    execute: (...arg: any) => any;
    name: Names;
}

export interface IntrStandartSchemaStrategy<A, R> {
    args: A;
    return: R;
}