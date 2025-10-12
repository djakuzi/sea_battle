/** Enum для типов битвы */
export enum EnumGame {
	BOT = 'bot',         // с ботом
	ONE_VS_ONE = 'one-vs-one',   // обычная онлайн битва
	TOURNAMENT = 'tournament', // турнир
	INVITE = 'invite',   // битва по приглашению
}

/** Enum для статусов игры */
export enum EnumStatusGame {
	NONE = 'false',      // битвы нет
	GAME = 'game',       // битва идет
	PAUSE = 'pause',     // битва на паузе
	FINISHED = 'finished',  // битва закончена
}

/** Enum для статусов выстрела */
export enum EnumStatusShot {
	KILL = 'kill',    // корабль уничтожен
	HIT = 'hit',      // попадание по кораблю
	MISS = 'miss',    // промах
}
