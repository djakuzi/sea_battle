import { CONFIG_API } from "../ApiClient.confing";

/**Получение host API */
export function getBaseURL(): string {
    return CONFIG_API.protocol + CONFIG_API.hostname + ':' + CONFIG_API.port;
}