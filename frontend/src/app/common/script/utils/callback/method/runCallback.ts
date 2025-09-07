export function runCallback<C>(callback: C): void {
    if (typeof callback === 'function') {
        callback();
    }
}