import styles from './BattleMoveParticipant.module.css';
import cn from "classnames";
import { JSX } from "react";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import IMGarrowPlayer from '../../../assets/icons/battle/arrowPlayer.svg';
import IMGarrowEnemy from '../../../assets/icons/battle/arrowEnemy.svg';
import { PropsBattleMoveParticipant } from './BattleMoveParticipant.props';

export default function BattleMoveParticipant({ cls }: PropsBattleMoveParticipant): JSX.Element {
    const { moveParticipant } = useSelector((state: RootState) => state.battle.battle);

    return (
        <div className={cn(styles['battle__move'], cls, {
            [styles['--player']]: (moveParticipant == 'player'),
        })}>
            <img className={styles['battle__move-player']} src={IMGarrowPlayer + ''} alt="ваш ход" title="ваш ход" />
            <img className={styles['battle__move-enemy']} src={IMGarrowEnemy + ''} alt="ход соперника" title="ход соперника" />
        </div>
    );
}