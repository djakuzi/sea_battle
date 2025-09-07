import { JSX } from "react";
import styles from './ListPlayer.module.css';
import cn from "classnames";
import { PropsListPlayer } from "./ListPlayer.props";
import CardFriend from "../CardPlayer/CardPlayer";

export default function ListPlayer({ 
    cls = '',
    listPlayers, 
    isSetBtnFriend = true,
}: PropsListPlayer):JSX.Element {
    
    return (
        <div className={cn(styles['list'], cls)}>
            {...listPlayers.map((el, i) => {
                if (el) {
                    return (
                        <CardFriend key={i} player={el} isSetBtnFriend={isSetBtnFriend} />
                    );
                }
            })}
        </div>
    );
}