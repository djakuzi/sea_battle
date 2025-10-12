import { JSX, useEffect, useRef } from "react";
import styles from './OneVsOne.module.css';
import { useSelector } from "react-redux";
import { RootState } from "@app-redux/store";
import IMGbg from '../../../../../assets/image/game/constructor/ship.jpg';
import BattleField from "../../components/BattleField/BattleField";
import BattleAction from "../../components/BattleAction/BattleAction";
import ModalWindow from "../../../../common/components/ModalWindow/ModalWindow";
import ModalPause from "../../components/ModalPause/ModalPause";
import ModalLose from "../../components/ModalLose/ModalLose";
import ModalWinner from "../../components/ModalWinner/ModalWinner";
import { GameOneVsOne } from "@app-layouts/Battle/modules/gameOneVsOne";

export default function OneVsOne(): JSX.Element {
	//redux
	const { error, status, winner } = useSelector((state: RootState) => state.battle.battle);
	//ref
	const refFielCoordPlayer = useRef<HTMLDivElement>(null);
	const refFielCoordEnemy = useRef<HTMLDivElement>(null);
	const refGame = useRef<GameOneVsOne>(new GameOneVsOne());

	useEffect( ()=> {
		refGame.current.setFieldCoord(refFielCoordPlayer.current, refFielCoordEnemy.current);
		refGame.current.init();
	}, [])
	
	return (
		<div className={styles['battle']} style={{ backgroundImage: `url(${IMGbg})` }}>
			<div className={styles['battle__wrapper']}>
				<BattleAction />
				<BattleField cls={styles['battle__field']} inputRefFielCoordEnemy={refFielCoordEnemy} inputRefFielCoordUser={refFielCoordPlayer} />
			</div>
			{status == 'pause' && <ModalWindow isShow={status == 'pause'}> <ModalPause /> </ModalWindow>}
			{winner == 'enemy' && <ModalWindow isShow={winner == 'enemy'}> <ModalLose /> </ModalWindow>}
			{winner == 'player' && <ModalWindow isShow={winner == 'player'}> <ModalWinner /></ModalWindow>}
		</div>
	);
}