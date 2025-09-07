import { TypeCallback } from "../../../../types/typeCallback.type";
/**
 * Cтандартная функция вызова setTimeout
 * @param delay - время выполнение;
 * @param callback - колбек выполняемая функция;
 * @returns boolean
 */
export function standartSetTimeout(delay: number, callback: TypeCallback<void>): NodeJS.Timeout {
    return setTimeout(() => callback(), delay);
}