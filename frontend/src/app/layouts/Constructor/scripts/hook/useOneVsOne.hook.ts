
import { transformationToFullCoordShips } from "@app-common/script/modules/Ship/methods/transformationToFullCoordShips";
import { IntrCoordPuttingShip } from "@app-common/types/Ship.interface";
import { EnumVariantPlayType } from "@app-core/data/list-component/interfaces/variantsPlay.interface";
import { EnumParticipant } from "@app-layouts/Battle/types/battle.enum";
import { WsOneVsOne } from "@app-network/ws/modules/BattleOneVsOne/OneVsOne.module";
import { WsServerStatus } from "@app-network/ws/modules/ServerConnectionStatus/ServerStatus.module";
import { actionsBattle } from "@app-redux/slice/battle/battle.slice";
import { actionsConstructor } from "@app-redux/slice/constructor/constructor.slice";
import { AppDispatch } from "@app-redux/store";
import { createNotificftionByList } from "@app-rootController/Visual-Interface/elements/Notification/modules/notification";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export interface IntrUserStartGame {
	searchGame: (coord: IntrCoordPuttingShip[], typeGame: EnumVariantPlayType) => void;
	exitQueue: () => void;
	statusText: string;
}

const statusText = {
	[EnumVariantPlayType.BOT]: 'Бот готовится',
	[EnumVariantPlayType.ONE_VS_ONE]: 'Поиск соперника',
	[EnumVariantPlayType.TOURNAMENT]: 'Поиск соперника',
	[EnumVariantPlayType.INVITE]: 'Ожидание друга'
};

export function useOneVsOne() {
	// dispatch redux
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	// state
	const [statusText, setStatusText] = useState<string>('');

	const startGame = {
		[EnumVariantPlayType.BOT]: (
			coord: IntrCoordPuttingShip[],
		) => {
			dispatch(actionsBattle.setCoordPuttingShips({
				typePlayers: EnumParticipant.PLAYER,
				coordPuttingShips: coord,
			}));

			setStatusText('Бот готовится');

			dispatch(actionsBattle.setTypeBattle(EnumVariantPlayType.BOT));
			dispatch(actionsConstructor.resetLastCoordsShips());

			navigate('/battle');
		},
		[EnumVariantPlayType.ONE_VS_ONE]: (
			coord: IntrCoordPuttingShip[],
		) => {
			setStatusText('Игра началась');
			dispatch(actionsBattle.setTypeBattle(EnumVariantPlayType.ONE_VS_ONE));
			if (!WsOneVsOne.data.enemy) {
				WsOneVsOne.disconnect();
			}
	
			dispatch(actionsBattle.setCoordPuttingShips({
				typePlayers: EnumParticipant.PLAYER,
				coordPuttingShips: coord,
			}));

			navigate('/battle');	
		}
	}

	const startSearchGame = {
		[EnumVariantPlayType.BOT]: (
			coord: IntrCoordPuttingShip[],
		) => {
			startGame[EnumVariantPlayType.BOT](coord);
		},
		[EnumVariantPlayType.ONE_VS_ONE]: (
			coord: IntrCoordPuttingShip[],
		) => {
			WsOneVsOne.connect(() => setStatusText('Поиск соперника'));

			WsOneVsOne.services.queue.onConnect();

			WsOneVsOne.services.session.onSessionCreated({
				callback: () => setStatusText('Соперник найден. Передача данных...'),
				ships: transformationToFullCoordShips(coord),
			});

			WsOneVsOne.services.procces.onGameStart({
				callback: () => {
					startGame[EnumVariantPlayType.ONE_VS_ONE](coord);
				},
			})
		}
	}

	const searchGame = (
		coord: IntrCoordPuttingShip[],
		typeGame: EnumVariantPlayType
	) => {
		startSearchGame[typeGame](coord);
	}

	const exitQueue = () => {
		WsOneVsOne.disconnect();
	}

	return {
		searchGame,
		exitQueue,
		statusText
	}
}