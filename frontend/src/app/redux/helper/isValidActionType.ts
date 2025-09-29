import { Action } from '@reduxjs/toolkit';

/**
 * Функция для проверки типа экшена с гибким механизмом фильтрации.
 * Можно настроить как должна происходить проверка (по полному совпадению, по началу строки или по подстроке).
 * 
 * @param action - Экшен, который нужно проверить
 * @param checkType - Тип проверки: 'full' | 'startsWith' | 'includes'
 * @param actionTypes - Список типов экшенов для проверки
 * @returns true, если экшен совпадает с одним из типов из списка согласно выбранному типу проверки
 */
export function isValidActionType(
    action: Action,
    checkType: 'full' | 'startsWith' | 'includes',
    ...actionTypes: string[]
): boolean {
    const actionType = action.type;

    switch (checkType) {
        case 'full':
            // Проверка по полному совпадению
            return actionTypes.includes(actionType);

        case 'startsWith':
            // Проверка на начало строки
            return actionTypes.some((type) => actionType.startsWith(type));

        case 'includes':
            // Проверка на наличие подстроки
            return actionTypes.some((type) => actionType.includes(type));

        default:
            return false;
    }
}