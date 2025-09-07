import cn from "classnames";
import styles from './BattleField.module.css';
import { JSX, memo } from "react";
import { PropsBattleField } from "./BattleField.props";
import CoordRect from "../../../../common/components/CoordRect/CoordRect";
import BattleStatus from "../BattleStatus/BattleStatus";
import IMGarrowPlayer from '../../.../../../../../assets/icons/game/battle/arrowPlayer.svg';
import IMGarrowEnemy from '../../.../../../../../assets/icons/game/battle/arrowEnemy.svg';
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";


function BattleField({ cls, inputRefFielCoordUser, inputRefFielCoordEnemy }: PropsBattleField): JSX.Element {
    const { moveParticipant } = useSelector((state: RootState) => state.battle.battle);

    return (
        <div className={cn(styles['battle__coords'], cls)}>
            <BattleStatus cls={styles['battle__status']} />
            <CoordRect inputRef={inputRefFielCoordUser} cls={styles['battle__coords-box']} isMountPort={true} />
            <div className={cn(styles['battle__move'], {
                [styles['--player']]: (moveParticipant == 'player'),
            })}>
                <img className={styles['battle__move-player']} src={IMGarrowPlayer + ''} alt="ваш ход" title="ваш ход" />
                <img className={styles['battle__move-enemy']} src={IMGarrowEnemy + ''} alt="ход соперника" title="ход соперника" />
            </div>
            <CoordRect inputRef={inputRefFielCoordEnemy} cls={styles['battle__coords-box']} isMountPort={true} />
        </div>
    );
}

export default memo(BattleField);