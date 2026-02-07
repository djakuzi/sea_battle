import { devModeConsole } from "@app-common/script/modules/Developer/methods/devModeConsole";
import { TypeCallback } from "@app-common/types/typeCallback.type";
import { runCallback } from "../../callback/method/runCallback";

export function isErrorWithConsole<R, Args extends any[] = []>(error: any, callback?: TypeCallback<R, Args>, args?: Args): R | void {
    if (error instanceof Error) {
		runCallback(callback, ...args as Args);
        devModeConsole('error', error.message);
    }
}