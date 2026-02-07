import { IntrServerStatus } from "./interfaces/serverStatus.interface";

export const LOG_SERVER_STATUS: Record<string, IntrServerStatus> = {
    noConnected: {
        notification: "Нет соединения с сервером",
        log: "Server is not connected",
    },
    connection: {
        notification: "Устанавливается соединение с сервером",
        log: "Establishing connection to the server",
    },
    connected: {
        notification: "Соединение с сервером установлено",
        log: "Server connected successfully",
    },
    disconnected: {
        notification: "Соединение с сервером было разорвано",
        log: "Server disconnected",
    },
    reconnecting: {
        notification: "Переподключение к серверу...",
        log: "Reconnecting to server...",
    },
    tryReconnecting: {
        notification: "Попытка переподключения к серверу...",
        log: "Trying to reconnect to server...",
    },
    reconnectFailed: {
        notification: "Не удалось переподключиться к серверу",
        log: "Reconnection to server failed",
    },
    timeout: {
        notification: "Превышено время ожидания подключения",
        log: "Server connection timeout",
    },
    connectError: {
        notification: "Ошибка при подключению к серверу",
        log: "Server connection error",
    },
};