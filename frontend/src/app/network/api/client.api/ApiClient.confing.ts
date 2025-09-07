import { isDevMode } from "../../../common/script/modules/Developer/methods/isDevMode";
import { ConfigApi } from "./interfaces/api.interface";

export const CONFIG_API: ConfigApi = {
    protocol: isDevMode() ? 'http://' : 'https://',
    hostname: isDevMode() ? 'localhost' : '',
    port: isDevMode() ? '2468' : '',
};