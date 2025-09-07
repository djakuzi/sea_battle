/**
 * Функция которая показывает находится ли функционал в раразботке или нет
 * @param isDev - true в разработке, а false готов
 * @returns boolean
 */
export function inDevelopment(isDev: boolean): string {
    const result: string = isDev ? '--not-developed' : '';
    return result;
}