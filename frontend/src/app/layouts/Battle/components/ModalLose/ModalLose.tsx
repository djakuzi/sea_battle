import { JSX } from "react";
import styles from './ModalLose.module.css';
import cn from 'classnames';
import Button from "../../../../common/components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import TitlePage from "../../../../common/components/TitlePage/TitlePage";
import { actionsBattle } from "../../../../redux/slice/battle/battle.slice";

export default function ModalLose(): JSX.Element {
	//another
	const navigate = useNavigate();
	//redux 
	const dispatch = useDispatch();
	const { nickname } = useSelector((store: RootState) => store.battle.enemy);
	const handlerClickExit = (): void => {
		navigate('/menu');
		dispatch(actionsBattle.clearDataBattle());
	};

	return (
		<div className={cn(styles['modal'])}>
			<div className={styles['modal-wrapper']}>
				<TitlePage cls={styles['modal-title']} size="big">Вы проиграли игроку: {nickname}</TitlePage>
				<div className={(styles['modal-action'])}>
					<Button cls={cn(styles['action__btn'])} visual="button-action" isBtn={true} onClick={handlerClickExit}>В меню</Button>
				</div>
			</div>
		</div>
	);
}