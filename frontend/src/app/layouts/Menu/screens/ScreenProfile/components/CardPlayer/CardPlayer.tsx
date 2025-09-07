import { JSX } from "react";
import styles from './CardPlayer.module.css';
import cn from "classnames";
import NamePlayer from "../../../../../../common/components/NamePlayer/NamePlayer";
import { PropsCardPlayer } from "./CardPlayer.props";
import StatusOnlinePlayer from "../../../../../../common/components/StatusOnlinePlayer/StatusOnlinePlayer";
import ButtonFriend from "../ButtonFriend/ButtonFriend";
import { createOneNotificftion } from "../../../../../../root-controller/Visual-Interface/elements/Notification/modules/notification";

export default function CardPlayer({
    cls = '',
    player,
    isSetBtnFriend = false,
}: PropsCardPlayer): JSX.Element {

    const onOpen = (): void => {
        if (!player.id) {
            createOneNotificftion(
                'error',
                `Не удалось открыть профиль ${player.nickname}. Попробуйте обновить страницу.`,
                false,
                5000
            );
            return;
        }
    };

    return (
        <div className={cn(
            styles['friend'],
            'flex-row',
            'flex-between',
            cls
        )}
            onClick={onOpen}
        >
            <NamePlayer
                cls={styles['friend-info']}
                player={{
                    nickname: player.nickname,
                    rank: player.experience,
                    avatar: player.avatar,
                }}
            />
            <div className={cn(
                'flex-column',
                'flex-between'
            )}
            >
                <StatusOnlinePlayer
                    cls={styles['friend-status']}
                    statusNetwork={{
                        is_online: player.is_online,
                        last_online: player.last_online
                    }}
                    idPlayer={player.id}
                />
                {isSetBtnFriend && <ButtonFriend cls={styles['friend-action']} statusFriend={player.actionFriends} />}
            </div>
        </div>
    );
}