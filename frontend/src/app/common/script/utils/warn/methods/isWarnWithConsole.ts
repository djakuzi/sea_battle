import { devModeConsole } from "@app-common/script/modules/Developer/methods/devModeConsole";
import { TypeCallback } from "@app-common/types/typeCallback.type";
import { runCallback } from "../../callback/method/runCallback";
import { Warn } from "../class/warn.class";

export function isWarnWithConsole<R, Args extends any[] = []>(error: any, callback?: TypeCallback<R, Args>, args?: Args): R | void {
	if (error instanceof Warn) {
		runCallback(callback, ...args as Args);
		devModeConsole('warn', error.message);
	}
}