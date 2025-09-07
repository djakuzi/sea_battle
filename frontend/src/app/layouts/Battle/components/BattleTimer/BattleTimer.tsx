import cn from "classnames";
import styles from './BattleTimer.module.css';
import { JSX } from "react";
import { PropsBattleTimer } from "./BattleTimer.props";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

export function BattleTimer({ cls }: PropsBattleTimer): JSX.Element {
    const { minutes, seconds } = useSelector((state: RootState) => state.battle.battle.timer);
    return (
        <div className={cn(styles['timer'], cls)}>
            <div className={styles['timer__minute']}>{minutes}</div>
            <div>:</div>
            <div className={styles['timer__seconds']}>{seconds}</div>
        </div>
    );
}