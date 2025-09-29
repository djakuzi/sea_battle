import { TypeCallback } from "@app-common/types/typeCallback.type";

export function runCallback<R = void, Args extends any[] = []>(
    callback?: TypeCallback<R, Args>,
    ...args: Args
): R | void {
    if (typeof callback === 'function') {
        return callback(...args);
    }
}