import { JSX } from "react";
import styles from './ModalPause.module.css';
import cn from 'classnames';
import { useDispatch } from "react-redux";
import TitlePage from "../../../../common/components/TitlePage/TitlePage";
import Button from "../../../../common/components/Button/Button";
import { actionsBattle } from "../../../../redux/slice/battle/battle.slice";
import { EnumStatusBattle } from "@app-layouts/Battle/types/battle.enum";

export default function ModalPause(): JSX.Element {
    //redux 
    const dispatch = useDispatch();

    const handlerClickPause = (): void => {
        dispatch(actionsBattle.setStatusBattle(EnumStatusBattle.GAME));
    };

    return (
        <div className={cn(styles['modal'])}>
            <div className={styles['modal-wrapper']}>
                <TitlePage cls={styles['modal-title']} size="big">Пауза</TitlePage>
                <div className={(styles['modal-action'])}>
                    <Button cls={cn(styles['action__btn'], 'button-action')} isBtn={true} onClick={handlerClickPause}>Продолжить игру</Button>
                </div>
            </div>
        </div>
    );
}