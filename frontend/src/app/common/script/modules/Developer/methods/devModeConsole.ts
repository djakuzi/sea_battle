import { isDevMode } from "@app-common/script/modules/Developer/methods/isDevMode";

export function devModeConsole(type: keyof Console, text: string): void {
    const res = console[type];

    if (isDevMode() && typeof res === 'function') {
        (res as (...args: any[]) => void)(text);
    }
}