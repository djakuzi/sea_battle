import { JSX, useEffect, useState } from "react";
import styles from './ModalStatistic.module.css';
import cn from "classnames";
import { useModalClose } from "../../../../../../common/context/ModalCloseContext";
import HeaderModal from "../../components/HeaderModal/HeaderModal";
import { IntrStatisticPlayerFull } from "../../../../../../common/types/StatisticPlayer.interface";
import StatisticPlayer from "../../components/StatisticPlayer/StatisticPlayer";
import FullLoad from "../../../../../../common/components/FullLoad/FullLoad";
import { standartSetTimeout } from "../../../../../../common/script/modules/TimeOut/methods/standartSetTimeout";
import { ServiceStatisticPlayer } from "../../../../../../network/api/client.api/services/Statistic-player/StatisticPlayer.service";

export default function ModalStatistic():JSX.Element {
    //custom context
    const resetJsx = useModalClose();
    //state
    const [error, setError] = useState<string>('');
    const [dataStatistic, setDataStatistic] = useState<IntrStatisticPlayerFull | null>(null);

    const clickExit = (): void => {
        resetJsx();
    };

    const loadStatistic = async ():Promise<void> => {
        try {
            const response = await ServiceStatisticPlayer.get();
            standartSetTimeout(1000, () => setDataStatistic(response));
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
                console.error(e);
            } else {
                setError('Неизвестная ошибка при получении статистики');
            }

            console.error(e);
        }
    };

    useEffect(() => {
        loadStatistic();
    }, []);

    return (
        <div className={cn(styles['statistic-player'])}>
            <div className={cn(styles['statistic-player__wrapper'])}>
                <HeaderModal cls={styles['statistic-player-header']} title="Статистика" onExit={clickExit} />
                {error && <div> {error}</div>}
                {(!error && !dataStatistic) && <FullLoad isBackground={false} posText="bottom" text="Загружаем статистику"/>}
                {dataStatistic  && <StatisticPlayer cls={styles['statistic-player-body']} dataStatisticPlayer={dataStatistic} />}
            </div>
        </div>
    );
}