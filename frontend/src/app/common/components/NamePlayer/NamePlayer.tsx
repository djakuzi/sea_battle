import cn from "classnames";
import styles from './NamePlayer.module.css';
import { JSX } from "react";
import { PropsNamePlayer } from "./NamePlayer.props";
import IMGavatar from '../../../../assets/icons/game/avatarsPlayer/default.svg';

export default function xNamePlayer({ cls = '', player, reverse = false }: PropsNamePlayer):JSX.Element {

    return (
        <div className={cn(styles['player'], cls, {
            [styles['--reverse']]: reverse
        })}>
            <div className={cn(styles['player__avatar'], cls)}>
                <img src={player.avatar ? player.avatar : IMGavatar + ''} alt={player.nickname} />
            </div>
            <div className={cn(styles['player__info'], cls)}>
                <div className={styles['player__info-name']}>{player.nickname}</div>
                <div className={styles['player__info-rank']}>Ранг: {player.rank}</div>
            </div>     
        </div>
    );
}