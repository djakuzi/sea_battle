import { JSX, memo } from "react";
import styles from './BattleAction.module.css';
import cn from 'classnames';
import type { PropsBattleAction } from "./BattleAction.props";
import { useNavigate } from "react-router-dom";
import Button from "../../../../common/components/Button/Button";
import { useDispatch } from "react-redux";
import { actionsBattle } from "../../../../redux/slice/battle/battle.slice";
import { WsOneVsOne } from "@app-network/ws/modules/BattleOneVsOne/OneVsOne.module";

function BattleAction({ cls = '', callback }: PropsBattleAction): JSX.Element {
	//another
	const navigate = useNavigate();
	//redux 
	const dispatch = useDispatch();
	const handlerClickExit = (): void => {
		const result = confirm('Вы хотите сдаться?');

		if (result) {
			navigate('/menu');
			dispatch(actionsBattle.clearDataBattle());
			WsOneVsOne.disconnect();
		}
	};

	return (
		<div className={cn(styles['action'], cls)}>
			<Button
				cls={cn(styles['action__exit'], 'button-action')}
				isBtn={true}
				onClick={callback.exit}
				visual="button-action"
			>
				Сдаться
			</Button>
		</div>
	);
}

export default memo(BattleAction);