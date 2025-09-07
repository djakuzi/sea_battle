import { getBaseURL } from "./getBaseURL";

/**
 * @param nameController - название контроллера
 * @returns {string} - путь до контроллера API
 */
export function getPathController(nameController: string, host?: string | undefined): string {
    return (host) ? host + '/' + nameController + '/' : getBaseURL() + '/' + nameController + '/';
}