/** 
 * Тип игрока:
 *  - 'ENEMY' - соперник;
 *  - 'PLAYER' - игрок.
 */
export enum EnumParticipant {
	ENEMY = 'enemy',
	PLAYER = 'player'
}

/** 
 * Тип врага:
 *  - 'REAL_USER' - реальный пользователь;
 *  - 'BOT' - бот.
 */
export enum EnumEnemy {
	REAL_USER = 'real_user',
	BOT = 'bot',
}

/** 
 * Статус битвы:
 *  - 'FALSE' - битвы нет;
 *  - 'GAME' - битва идет;
 *  - 'PAUSE' - битва на паузе;
 *  - 'FINISHED' - битва закончена.
 */
export enum EnumStatusBattle {
	NONE = 'false',
	GAME = 'game',
	PAUSE = 'pause',
	FINISHED = 'finished'
}

/** 
 * Статус выстрела:
 *  - 'KILL' - корабль уничтожен;
 *  - 'HIT' - попадание по кораблю;
 *  - 'MISS' - промах.
 */
export enum EnumStatusShot {
	KILL = 'kill',
	HIT = 'hit',
	MISS = 'miss'
}

/** 
 * Результат боя:
 *  - 'FALSE' - результата боя нет;
 *  - @type {EnumParticipant} - тип игрока, который выиграл бой.
 */
export enum EnumResultBattle {
	NONE = 'false',
	PLAYER = 'player',
	ENEMY = 'enemy'
}
