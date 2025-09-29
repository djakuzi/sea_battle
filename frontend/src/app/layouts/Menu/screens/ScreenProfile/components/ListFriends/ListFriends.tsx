import { JSX } from "react";
import styles from './ListFriends.module.css';
import cn from "classnames";
import { PropsListFriends } from "./ListFriends.props";
import CardPlayer from "../CardPlayer/CardPlayer";
import { useListFriend } from "../../../../../../common/script/hooks/api-hooks/useFriend.hook";

export default function ListFriends({ 
    cls = '',
    listPlayers ,
    idPlayer,
}: PropsListFriends):JSX.Element {
    const { listFriend, updateListFriend } = useListFriend(idPlayer, listPlayers);

    if (listFriend?.length === 0 || !listFriend) {
        return (
            <div className={cn(styles['list'], cls)} style={{margin: 'auto 0'}}>
                <div>Список друзей пуст</div>
            </div>
        );
    }
    
    return (
        <div className={cn(styles['list'], cls)}>
            {...listFriend.map((el, i) => {
                if (el) {
                    el.actionFriends = {
                        idPlayer: el.id,
                        action: 'delete',
                    }
                    
                    return (
                        <CardPlayer 
                            key={i} 
                            player={el} 
                            isSetBtnFriend={true}
                        />
                    );
                }
            })}
        </div>
    );
}