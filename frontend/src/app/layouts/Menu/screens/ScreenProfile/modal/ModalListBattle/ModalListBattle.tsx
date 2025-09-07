import { JSX, useEffect, useState } from "react";
import styles from './ModalListBattle.module.css';
import cn from "classnames";
import HeaderModal from "../../components/HeaderModal/HeaderModal";
import { useModalClose } from "../../../../../../common/context/ModalCloseContext";
import { IntrStatisticPlayer } from "../../../../../../network/api/client.api/services/Statistic-player/types/statistic-player.inerface";

export default function ModalListBattle():JSX.Element {
    //custom context
    const resetJsx = useModalClose();
    //state
    const [dataListBattle, setDataListBattle] = useState<IntrStatisticPlayer>();

    const clickExit = (): void => {
        resetJsx();
    };

    // const loadListBattle = async (): Promise<void> => {
    //     try {
    //         const response = await ServiceListBattle.get();
    //         setDataListBattle(response);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };

    // useEffect(() => {
    //     loadListBattle();
    // }, []);

    return (
        <div className={cn(styles['list-battle'])}>
            <div className={cn(styles['list-battle__wrapper'])}>
                <HeaderModal cls={styles['list-battle-header']} title="Список боев" onExit={clickExit} />

                <div className={styles['list-battle-body']}>

                </div>
            </div>
        </div>
    );
}