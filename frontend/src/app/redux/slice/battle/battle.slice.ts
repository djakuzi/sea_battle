import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
import { EnumEnemy, EnumParticipant, EnumResultBattle, EnumStatusBattle } from '@app-layouts/Battle/types/battle.enum';
import { EnumVariantPlayType } from '@app-core/data/list-component/interfaces/variantsPlay.interface';

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
		typeEnemy: EnumEnemy.BOT,
		id: '0',
		nickname: '',
		experience: 999,
		countRemainingShip: 0,
		coordPuttingShips: [],
	},
	battle: {
		roomId: 0,
		id: 0,
		moveParticipant: EnumParticipant.PLAYER,
		status: EnumStatusBattle.NONE,
		winner: EnumResultBattle.NONE,
		timer: {
			time: CONFIG_BATTLE.timeMoveParticipant.fullTime,
			minutes: CONFIG_BATTLE.timeMoveParticipant.minute,
			seconds: CONFIG_BATTLE.timeMoveParticipant.seconds,
		},
		type: EnumVariantPlayType.BOT,
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
