export interface ConfigWebsocketManager extends SocketIOClient.ConnectOpts  {
    transports: string[],
    hostname: string,
    port: string,
    secure?: boolean;
}