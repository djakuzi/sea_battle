import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeBattle, TypeParticipant, TypeResultBattle, TypeStatusBattle } from '../../layouts/Battle/types/battle';
import { IntrCoordPuttingShip } from '../../common/types/Ship.interface';
import { IntrDataBattle, IntrInfoEnemy, IntrInfoPlayer, IntrTimerBattle, IntrUpdatingCountRemainingShip } from '../../layouts/Battle/type/Battle.interface';
import { CONFIG_BATTLE } from '../../core/settings/battle.settings';

export interface initialState {
  player: IntrInfoPlayer;
  enemy: IntrInfoEnemy;
  battle: IntrDataBattle;
}

const initialState: initialState = {
  player: {
    countRemainingShip: 0,
    coordPuttingShips: [],
  },
  enemy: {
    typeEnemy: 'bot',
    id: 0,
    nickname: '',
    experience: 999,
    countRemainingShip: 0,
    coordPuttingShips: [],
  },
  battle: {
    roomId: 0,
    id: 0,
    moveParticipant: 'player',
    status: false,
    winner: false,
    timer: {
      time: CONFIG_BATTLE.timeMoveParticipant.fullTime,
      minutes: CONFIG_BATTLE.timeMoveParticipant.minute,
      seconds: CONFIG_BATTLE.timeMoveParticipant.seconds,
    },
    type: 'bot',
    error: '',
  },
};

const sliceBattle = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    /** setTypeBattle - очистить данные о битве */
    clearDataBattle: (state) => {
      state.player = {
        countRemainingShip: 0,
        coordPuttingShips: [],
      };
      state.enemy = {
        typeEnemy: 'bot',
        id: 0,
        nickname: '',
        experience: 999,
        countRemainingShip: 0,
        coordPuttingShips: [],
      };
      state.battle = {
        roomId: 0,
        id: 0,
        moveParticipant: 'player',
        status: false,
        winner: false,
        timer: {
          time: CONFIG_BATTLE.timeMoveParticipant.fullTime,
          minutes: CONFIG_BATTLE.timeMoveParticipant.minute,
          seconds: CONFIG_BATTLE.timeMoveParticipant.seconds,
        },
        type: 'bot',
        error: '',
      };
    },
    /** setTypeBattle - установить тип игры. */
    setTypeBattle: (state, action: PayloadAction<TypeBattle>) => {
      state.battle.type = action.payload;
    },
    /** setIsPlayerMove - установить чей ход. */
    setParticipantMove: (state, action: PayloadAction<TypeParticipant>) => {
      state.battle.moveParticipant = action.payload;
    },
    /** setCoordPuttingShips - установить данные координат участнику битвы.
     * @param {object} action
     * @property {TypePlayers} typePlayers
     * @property {IntrCoordPuttingShip[]} coordPuttingShips
     */
    setCoordPuttingShips: (
      state,
      action: PayloadAction<{
        typePlayers: TypeParticipant;
        coordPuttingShips: IntrCoordPuttingShip[];
      }>,
    ) => {
      const { typePlayers, coordPuttingShips } = action.payload;
      state[typePlayers]!.coordPuttingShips = coordPuttingShips;
    },
    /** setIsPlayerMove - установить данные о противнике */
    setDataEnemy: (state, action: PayloadAction<IntrInfoEnemy>) => {
      state.enemy = action.payload;
    },
    /** setStatusBattle - установить статус битвы
     */
    setStatusBattle: (state, action: PayloadAction<TypeStatusBattle>) => {
      state.battle.status = action.payload;
    },
    /** setResultBattle - установить результат битвы
     */
    setResultBattle: (state, action: PayloadAction<TypeResultBattle>) => {
      state.battle.winner = action.payload;
    },
    /** updateTimer - обновить таймер
     */
    updateTimer: (state, action: PayloadAction<IntrTimerBattle>) => {
      state.battle.timer = action.payload;
    },
    /** updateTimer - обновить cчетчик оставшихся кораблей
     */
    updateCountRemainingShip: (state, action: PayloadAction<IntrUpdatingCountRemainingShip>) => {
      const { typePlayers, countRemainingShip } = action.payload;
      state[typePlayers]!.countRemainingShip = countRemainingShip;
    },
    /** setError - выявить ошибку
     *
     * **Примечание
     *  - Пустая строка '' - удаление ошибки.
     */
    setError: (state, action: PayloadAction<string | ''>) => {
      state.battle.error = action.payload;
    },
  },
});

export const actionsBattle = sliceBattle.actions;
export default sliceBattle.reducer;
