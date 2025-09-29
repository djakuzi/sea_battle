import { isDevMode } from "@app-common/script/modules/Developer/methods/isDevMode";
import { runCallback } from "./runCallback";

export function devModeCallback<C>(callback: C): void {
    if (isDevMode()) {
        runCallback(callback);
    }
}