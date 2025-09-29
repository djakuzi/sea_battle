import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeResultBattle, TypeStatusBattle } from '../../../layouts/Battle/types/battle';
import { IntrDataBattle, IntrInfoEnemy, IntrInfoPlayer, IntrTimerBattle, IntrUpdatingCountRemainingShip } from '../../../layouts/Battle/type/Battle.interface';
import { CONFIG_BATTLE } from '../../../core/settings/battle.settings';
import { clearDataBattle } from './reducers/clearDataBattle';
import { setTypeBattle } from './reducers/setTypeBattle';
import { setParticipantMove } from './reducers/setParticipantMove';
import { setCoordPuttingShips } from './reducers/setCoordPuttingShips';
import { setDataEnemy } from './reducers/setDataEnemy';
import { setStatusBattle } from './reducers/setStatusBattle';
import { setError } from './reducers/setError';
import { setResultBattle } from './reducers/setResultBattle';
import { updateCountRemainingShip } from './reducers/updateCountRemainingShip';
import { updateTimer } from './reducers/updateTimer';

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
    clearDataBattle,
    setTypeBattle,
    setParticipantMove,
    setCoordPuttingShips,
    setDataEnemy,
    setStatusBattle,
    setResultBattle,
    updateTimer,
    updateCountRemainingShip,
    setError,
  },
});

export const actionsBattle = sliceBattle.actions;
export default sliceBattle.reducer;
