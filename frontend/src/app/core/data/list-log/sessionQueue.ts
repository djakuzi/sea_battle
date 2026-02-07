import { IntrServerStatus } from "./interfaces/serverStatus.interface";

export const LOG_SESSION_QUEUE: Record<string, IntrServerStatus> = {
	connection: {
		notification: "Подключение к очереди битвы",
		log: "Joining the battle queue...",
	},
	connected: {
		notification: "Вы добавлены в очередь битвы",
		log: "Successfully added to the battle queue",
	},
	disconnected: {
		notification: 'Вы вышли из очереди или игры',
		log: "Disconnected from the battle queue or game",
	},
	sessionCreated: {
		notification: 'Cоперник найден',
		log: "Created session the game",
	},
	gameStart: {
		'notification': 'Игра началась',
		'log': 'Game start'
	}
};