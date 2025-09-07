/** Время хода участника боя
 * @param fullTimeInSeconds - время хода в секундах
 * @param minute: - количество минут в ходе
 *  @param seconds: количество секунда в ходе
 */
export interface IntrTimeMoveParticipant {
    fullTime: number,
    minute: string,
    seconds: string,
}

/**
 * @description - Настройки боя
 * @param {IntrTimeMoveParticipant} timeMoveParticipant - время хода участника боя
 */
export interface IntrConfigBattle {
    timeMoveParticipant: IntrTimeMoveParticipant,
};