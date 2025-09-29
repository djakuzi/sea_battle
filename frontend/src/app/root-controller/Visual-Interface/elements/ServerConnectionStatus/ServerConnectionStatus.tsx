import styles from './ServerConnectionStatus.module.css';
import cn from "classnames";
import { JSX, useEffect, useState } from "react";
import { PropsServerConnectionStatus } from './ServerConnectionStatus.props';
import IMGdisconnect from '@assets/icons/game/status-server/disconnect.png'
import IMGconnect from '@assets/icons/game/status-server/connect.png'
import IMGconnectionOne from '@assets/icons/game/status-server/connection-1.png'
import IMGconnectionTwo from '@assets/icons/game/status-server/connection-2.png'
import Ping from './components/Ping/Ping';
import { useAnimationUi } from '@app-common/script/hooks/ui/useAnimationUi.hook';
import AnimationUi from '@app-common/components/AnimationUi/AnimationUi';
import ThreeDimensionalElement from '@app-common/components/ThreeDimensionalElement/ThreeDimensionalElement';
import { useStatusServer } from '../../../../common/script/hooks/ws-hooks/useStatusServer.hook';
import { RootState } from '@app-redux/store';
import { useSelector } from 'react-redux';
import Reconnect from './components/Reconnect/Reconnect';

export default function ServerConnectionStatus({ cls = '' }: PropsServerConnectionStatus): JSX.Element {
    //redux
    const { isPing } = useSelector((s: RootState) => s.gameSettings.statusConnectionServer);
    //custom state 
    const isInterfaceAnimation = useAnimationUi('isInterface');
    const { isConnection, isConnect, isDisconnect } = useStatusServer();
    //state
    const [isShowPanelDisconnect, setIsShowPanelDisconnect] = useState<boolean>(false);

    useEffect(() => {
        if (isDisconnect) {
            setIsShowPanelDisconnect(true);
        }
    }, [isDisconnect])

    return (
        <div className={cn(styles['server-status'], cls)}>
            <div className={styles['server-status__wrapper']}>
                {isConnection && (
                    <AnimationUi cls={cn(
                        styles['server-status-connection'],
                        styles['server-status__item']
                    )}
                        isAnimation={isInterfaceAnimation.isInterface}>
                        <ThreeDimensionalElement
                            cls={cn(styles['server-status-connection__img'], styles['version-1'])}
                            is3D={true}
                            count={18}
                            direction='forward'
                        >
                            <img src={IMGconnectionOne} alt="подключение" />
                        </ThreeDimensionalElement>
                        <ThreeDimensionalElement
                            cls={cn(styles['server-status-connection__img'], styles['version-1'])}
                            is3D={true}
                            count={10}
                            direction="backward"
                        >
                            <img src={IMGconnectionTwo} alt="подключение" />
                        </ThreeDimensionalElement>
                    </AnimationUi>
                )}
                {isConnect && (
                    <AnimationUi cls={cn(
                        styles['server-status-connect'],
                        styles['server-status__item'],
                    )}
                        isAnimation={isInterfaceAnimation.isInterface}>
                        {isPing && <Ping cls={''} />}
                        <div className={styles['server-status-connect__img']}>
                            <img src={IMGconnect} alt="подключен к серверу" />
                        </div>
                    </AnimationUi>
                )}
                {isDisconnect && (
                    <AnimationUi cls={cn(
                        styles['server-status-disconnect'],
                        styles['server-status__item']
                    )}
                        isAnimation={isInterfaceAnimation.isInterface}>
                        <div className={styles['server-status-disconnect__img']} onClick={() => setIsShowPanelDisconnect(true)}>
                            <img src={IMGdisconnect} alt="нет подключения к серверу" />
                        </div>
                    </AnimationUi>
                )}
            </div>
            {(isDisconnect && isShowPanelDisconnect) && <Reconnect cls={styles['server-disconnect-panel']} useState={setIsShowPanelDisconnect} />}
        </div>
    );
}