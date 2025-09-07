export interface ConfigWebsocket {
    transports: string[],
    hostname: string,
    port: string,
    secure?: boolean;
}