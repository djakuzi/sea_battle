import { IntrCoordPuttingShip } from "@app-common/types/Ship.interface";
import { TypeBattle } from "@app-layouts/Battle/types/battle";
import { actionsBattle } from "@app-redux/slice/battle/battle.slice";
import { actionsConstructor } from "@app-redux/slice/constructor/constructor.slice";
import { AppDispatch } from "@app-redux/store";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

export interface IntrUserStartGame {
	startGame: (coord: IntrCoordPuttingShip[], typeGame: TypeBattle) => void;
}

export function useStartGame() {
	// dispatch redux
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	
	const startGame = (
		coord: IntrCoordPuttingShip[],
		typeGame: TypeBattle
	) => {
		if (typeGame === 'bot') {
			dispatch(actionsBattle.setCoordPuttingShips({
				typePlayers: 'player',
				coordPuttingShips: coord,
			}));

			dispatch(actionsBattle.setTypeBattle(typeGame));
			dispatch(actionsConstructor.resetLastCoordsShips());
			navigate('/battle');
		} else if (typeGame === 'online') {

		}
	}

	return {
		startGame
	}
}