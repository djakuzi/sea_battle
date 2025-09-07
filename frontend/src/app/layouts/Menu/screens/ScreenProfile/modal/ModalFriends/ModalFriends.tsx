import { JSX, useState } from "react";
import styles from './ModalFriends.module.css';
import cn from "classnames";
import HeaderModal from "../../components/HeaderModal/HeaderModal";
import { useModalClose } from "../../../../../../common/context/ModalCloseContext";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../redux/store";
import { IntrPlayerFull } from "../../../../../../common/types/Player.interface";
import SearchPlayer from "../../components/SearchPlayer/SearchPlayer";
import ListFriends from "../../components/ListFriends/ListFriends";

export default function ModalFriends(): JSX.Element {
    //custom context
    const resetJsx = useModalClose();
    //state
    const [idTab, setIdTab] = useState<number>(0);
    //redux
    const { player } = useSelector((s: RootState) => s.auth);
    const listPlayers = [player as IntrPlayerFull];

    const clickExit = (): void => {
        resetJsx();
    };

    return (
        <div className={cn(styles['friends'])}>
            <div className={cn(styles['friends__wrapper'])}>
                <HeaderModal cls={styles['friends-header']} title="Друзья" onExit={clickExit} />
                <div className={styles['friends-tabs']}>
                    <div className={styles['friends-tabs__item']} onClick={() => setIdTab(0)}>
                        Мои друзья
                    </div>
                    <div className={styles['friends-tabs__item']} onClick={() => setIdTab(1)}>
                        Поиск друга
                    </div>
                </div>
                <div className={styles['friends-body']}>
                    <div className={cn(
                        styles['tab'],
                        {
                            [styles['tab--show']]: idTab === 0,
                        }
                    )}
                    >
                        <ListFriends
                            cls={styles['friends-list']}
                        />
                    </div>
                    <div className={cn(
                        styles['tab'],
                        {
                            [styles['tab--show']]: idTab === 1,
                        }
                    )}
                    >
                        <SearchPlayer cls={styles['friendx-search']} />
                    </div>
                </div>
            </div>
        </div>
    );
}