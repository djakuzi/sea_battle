import { JSX } from "react";
import styles from './ModalWinner.module.css';
import cn from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../redux/store";
import TitlePage from "../../../../common/components/TitlePage/TitlePage";
import Button from "../../../../common/components/Button/Button";
import { actionsBattle } from "../../../../redux/slice/battle/battle.slice";

export default function ModalWinner(): JSX.Element {
    //another
    const navigate = useNavigate();
    //redux 
    const dispatch = useDispatch();
    const { name } = useSelector((store: RootState) => store.battle.enemy);
    const handlerClickExit = (): void => {
        navigate('/menu');
        dispatch(actionsBattle.clearDataBattle());
    };

    const handlerClickКevenge = (): void => {

    };

    return (
        <div className={cn(styles['modal'])}>
            <div className={styles['modal-wrapper']}>
                <TitlePage cls={styles['modal-title']} size="big">Вы выиграли игрока: {name}</TitlePage>
                <div className={(styles['modal-action'])}>
                    <Button cls={cn(styles['action__btn'], 'button-action')} isBtn={true} onClick={handlerClickКevenge}>Предложить еще игру</Button>
                    <Button cls={cn(styles['action__btn'], 'button-action')} isBtn={true} onClick={handlerClickExit}>В меню</Button>
                </div>
            </div>
        </div>
    );
}