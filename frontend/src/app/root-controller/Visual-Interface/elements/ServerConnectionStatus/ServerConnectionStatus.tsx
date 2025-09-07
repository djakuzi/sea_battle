import styles from './ServerConnectionStatus.module.css';
import cn from "classnames";
import { JSX, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ServiceServerConnectionStatus } from '@app-network/webSocket/services/ServerConnectionStatus/types/ServerConnectionStatus.service';
import { AppDispatch, RootState } from '@app-redux/store';
import { actionsConnectStatusServer } from '@app-redux/slice/status-server/statusConnectServer.slice';
import { PropsServerConnectionStatus } from './ServerConnectionStatus.props';
import IMGdisconnect from '@assets/icons/game/status-server/disconnect.png'
import IMGconnect from '@assets/icons/game/status-server/connect.png'
import IMGconnectionOne from '@assets/icons/game/status-server/connection-1.png'
import IMGconnectionTwo from '@assets/icons/game/status-server/connection-2.png'
import Ping from './components/Ping/Ping';
import { useAnimationUi } from '@app-common/script/hooks/ui/useAnimationUi.hook';
import { standartSetTimeout } from '@app-common/script/modules/TimeOut/methods/standartSetTimeout';
import AnimationUi from '@app-common/components/AnimationUi/AnimationUi';
import ThreeDimensionalElement from '@app-common/components/ThreeDimensionalElement/ThreeDimensionalElement';

export default function ServerConnectionStatus({ cls = '' }: PropsServerConnectionStatus): JSX.Element {
    //custom state 
    const isInterfaceAnimation = useAnimationUi('isInterface');
    //redux
    const dispatch = useDispatch<AppDispatch>();
    const { isConnection, isConnect, isDisconnect} = useSelector((s: RootState) => s.statusServer);
    //ref
    const refServiceSocketStatus = useRef<ServiceServerConnectionStatus | null>(null);
    const refPing = useRef<number | null>(null);

    function connection(): void {
        dispatch(actionsConnectStatusServer.setIsConnection());
    }

    function connect(): void {
        standartSetTimeout(3000, () => dispatch(actionsConnectStatusServer.setIsConnect()));
    }

    function disconnect(): void {
        dispatch(actionsConnectStatusServer.setIsDisconnect());
        // refServiceSocketStatus.current?.disconnect();
    }

    function setPing(): void {
        // dispatch();
    }

    useEffect(() => {
        if (!refServiceSocketStatus.current) {
            refServiceSocketStatus.current = new ServiceServerConnectionStatus('/status-server');

            refServiceSocketStatus.current.listenConnect(connect);

            refServiceSocketStatus.current.listenDisconnect(disconnect);
            refServiceSocketStatus.current.listenConnectTimeout(() => {
                console.error("Превысилось ожидание подключения к серверу");
                disconnect()
            });
            refServiceSocketStatus.current.listenConnectError(() => {
                console.error("Произошла ошибка");
                disconnect()
            });
            refServiceSocketStatus.current.listenReconnectFailed( () => {
                console.error("Не удалось переподключиться к серверу");
                disconnect()
            });

            refServiceSocketStatus.current.listennerPing(setPing);
        }

        return (): void => {
            if (refServiceSocketStatus.current) {
                refServiceSocketStatus.current.disconnect(disconnect);
            }
        };
    }, []);

    useEffect(()=> {
        if(!refServiceSocketStatus.current) return;

        if (!isConnect && !isConnection && isDisconnect) {
            refServiceSocketStatus.current.connect(connection);
        }
    }, [isConnect])

    return (
        <div className={cn(styles['server-status'], cls)}>
            <div className={styles['server-status__wrapper']} >
                {isConnection && (
                    <AnimationUi cls={cn(styles['server-status-connection'], styles['server-status__item'])} isAnimation={isInterfaceAnimation.isInterface}>
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
                    )} isAnimation={isInterfaceAnimation.isInterface}>
                            {<Ping cls={''} value={refPing.current} />}
                            <div className={styles['server-status-connect__img']}>
                                <img src={IMGconnect} alt="подключен к серверу" />
                            </div>
                    </AnimationUi>
                )}
                {isDisconnect && (
                    <AnimationUi cls={cn(styles['server-status-disconnect'], styles['server-status__item'])} isAnimation={isInterfaceAnimation.isInterface}>
                            <div className={styles['server-status-disconnect__img']}>
                                <img src={IMGdisconnect} alt="нет подключения к серверу"/>
                            </div>
                    </AnimationUi>
                )}
            </div>
        </div>
    );
}