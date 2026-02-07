import { CONFIG_BATTLE } from "@app-core/settings/battle.settings";

/** setTypeBattle - очистить данные о битве */
export function clearDataBattle(state) {
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
};