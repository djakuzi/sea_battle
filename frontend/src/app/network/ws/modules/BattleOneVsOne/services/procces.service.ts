import { devModeConsole } from "@app-common/script/modules/Developer/methods/devModeConsole";
import { CoreOneVsOne, WsOneVsOne } from "../OneVsOne.module";
import { runCallback } from "@app-common/script/utils/callback/method/runCallback";
import { LOG_SESSION_QUEUE } from "@app-core/data/list-log/sessionQueue";
import { EnumEnemy } from "@app-layouts/Battle/types/battle.enum";
import { IntrOnWebsocket } from "@app-network/ws/types/onWebsocket.interface";
import { IntrOnMyShot, IntrEventMyShot, IntrOnShotByEnemy, IntrEventShotAtMe, IntrOnShotAtMe, IntrOnUpdateTime } from "../types/gameShot.interface";
import { IntrEventGameStart } from "../types/gameStart.interface";
import { IntrEventUpdateTime } from "../types/gameTime";
import { IntrEventWinner, IntrOnWinner } from "../types/gameWinner.interface";

export class ServiceProcces {
	private readonly core: CoreOneVsOne;

	constructor(core: CoreOneVsOne) {
		this.core = core;
	}

	onGameStart(args: IntrOnWebsocket): void {
		this.core._onSubscribe('gameStart', (event: IntrEventGameStart) => {

			this.core.data.enemy = {
				id: event.enemy.id,
				nickname: event.enemy.nickname,
				experience: event.enemy.experience,
				typeEnemy: EnumEnemy.REAL_USER,
				countRemainingShip: 10,
				coordPuttingShips: [],
				guestOrPlayer: event.enemy.type
			}

			this.core.data.firstMove = event.firstMove;

			devModeConsole('log', `${LOG_SESSION_QUEUE.gameStart.log}`);
			runCallback(args.callback);
		});
	}

	onMyShot(args: IntrOnMyShot) {
		this.core._onSubscribe('myShot', (event: IntrEventMyShot) => {
			runCallback<void, any[]>(args.callback, event.resultShot, event.moveParticipant);
		});
	}

	onShotAtMe(args: IntrOnShotAtMe) {
		this.core._onSubscribe('shotAtMe', (event: IntrEventShotAtMe) => {
			runCallback<void, any[]>(args.callback, event.resultShot, event.moveParticipant);
		});	
	}

	onUpdateTime(args: IntrOnUpdateTime) {
		this.core._onSubscribe('updateTime', (event: IntrEventUpdateTime) => {
			runCallback<void, any[]>(args.callback, event);
		});
	}

	onEndTime(args: IntrOnWebsocket) {
		this.core._onSubscribe('endTime', () => {
			runCallback<void, any[]>(args.callback);
		});
	}

	onEnemyLeft(args: IntrOnWebsocket) {
		this.core._onceSubscribe('enemyLeft', (event: IntrEventWinner) => {
			runCallback<void, any[]>(args.callback);
		});
	}

	onceWinner(args: IntrOnWinner) {
		this.core._onceSubscribe('winner', (event: IntrEventWinner) => {
			runCallback<void, any[]>(args.callback, event);
		});
	}

	emitShotByEnemy(args: IntrOnShotByEnemy):void {
		this.core._emit('shotByParticipant', {
			idSession: WsOneVsOne.data.idSession,
			coord: args.coord
		})
	}
}
