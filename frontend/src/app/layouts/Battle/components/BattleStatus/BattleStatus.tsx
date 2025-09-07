import cn from "classnames";
import styles from './BattleStatus.module.css';
import { JSX, useMemo } from "react";
import { PropsBattleStatus } from "./BattleStatus.props";
import NamePlayer from "../../../../common/components/NamePlayer/NamePlayer";
import BattleCountShip from "../BattleCountShip/BattleCountShip";
import { BattleTimer } from "../BattleTimer/BattleTimer";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";

export default function BattleStatus({ cls = '' }: PropsBattleStatus): JSX.Element {
    //redux
    const authPlayer = useSelector((state: RootState) => state.auth.player);
    const enemy = useSelector((state: RootState) => state.battle.enemy);
    const player = useSelector((state: RootState) => state.battle.player);
    const dataPlayer = useMemo(() => ({
        nickname: authPlayer?.nickname ? authPlayer.nickname : 'Гость',
        rank: authPlayer?.experience ? authPlayer.experience : 0
    }), []);

    const dataEnemy = useMemo(() => ({
        nickname: enemy.nickname,
        rank: enemy.experience
    }), [enemy.nickname, enemy.experience]);

    const refIsShowTimer = true;

    return (
        <div className={cn(styles['status'], cls)}>
            <div className={styles['status__user']}>
                <NamePlayer cls={styles['status__user-info']} player={dataPlayer} />
                <BattleCountShip cls={styles['status__user-count']} count={player.countRemainingShip} />
            </div>
            {refIsShowTimer && <BattleTimer cls={styles['status__timer']} />}
            <div className={cn(styles['status__user'], styles['--reverse'])}>
                <NamePlayer cls={styles['status__user-info']} player={dataEnemy} reverse={true} />
                <BattleCountShip cls={styles['status__user-count']} count={enemy.countRemainingShip} />
            </div>
        </div>
    );
}