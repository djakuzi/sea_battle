import { CONFIG_APP } from "@app-core/config/app.config";

export function isDevMode(): boolean {
    return CONFIG_APP.mode == 'dev' ? true : false;
}