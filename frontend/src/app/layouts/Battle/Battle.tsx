import '@app-styles/game/fieldCoord.css';
import { JSX, useEffect, useState } from "react";
import styles from './Battle.module.css';
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from '@app-redux/store';


export default function Battle(): JSX.Element {
    //redux screen
    const { type: typeBattle } = useSelector((state: RootState) => state.battle.battle);
    //another
    const [isError, setIsError] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!typeBattle) {
            setIsError(true);
        }

		navigate('/battle/' + typeBattle);
    }, []);

    return (
        <div className={styles['battle']}>
            {isError && <div>ошибка</div>}
            {!isError && <Outlet></Outlet>}
        </div>
    );
}