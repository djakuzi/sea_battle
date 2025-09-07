/** TypeBattle - тип битвы:
 *  - 'bot' - с ботом;
 *  - 'online' - обычная онлайн битва;
 *  - 'tournament' - турнир;
 *  - 'invite' - битва по приглашению.
*/
export type TypeBattle = 'bot' | 'online' | 'tournament' | 'invite';
/** TypeEnemy - Тип игрока:
 *  - 'enemy' - соперник;
 *  - 'player' - игрок.
*/
export type TypeParticipant = 'enemy' | 'player';
/** TypeEnemy - Тип врага:
 *  - 'real_user' - реальный пользователь;
 *  - 'bot' - бот.
*/
export type TypeEnemy = 'real_user' | 'bot';
/** TypeStatusBattle - Статус битвы:
 *  - false - битвы нет;
 *  - 'game' - битва идет;
 *  - 'pause' - битва на паузе;
 *  - 'finished' - битва закончена.
*/
export type TypeStatusBattle = false | 'game' | 'pause' | 'finished';
/** TypeStatusShoot - статус выстрела
 *  - kill - корабль уничтожен;
 *  - hit - попадание по кораблю;
 *  - miss - промах.
*/
export type TypeStatusShot = 'kill' | 'hit' | 'miss'
/** TypeResultBattle - результат боя 
 * - false - результата боя нет;
 * @type {TypeParticipant} - тип игрока, который выграл бой.
*/
export type TypeResultBattle = false | TypeParticipant;
