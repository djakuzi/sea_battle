import cn from "classnames";
import styles from './StatusOnlinePlayer.module.css';
import { JSX, useEffect } from "react";
import { PropsStatusOnlinePlayer } from "./StatusOnlinePlayer.props";
import { useStatusNetworkPlayer } from "@app-common/script/hooks/api-hooks/useStatusNetworkPlayer";

export default function StatusOnlinePlayer({ 
    cls = '', 
    type = 'insertStatus', 
    idPlayer, 
    statusNetwork = null 
}: PropsStatusOnlinePlayer): JSX.Element {
    const { objStatusNetwork, getStatus } = useStatusNetworkPlayer(idPlayer, statusNetwork);

    function updateOnline() {
        if (type === 'getStatus' || objStatusNetwork === null) {
            try {
                getStatus();
            } catch (error) {
                console.error('Error fetching status:', error);
            }
        }
    }

    useEffect( () => {
        updateOnline();
    }, []);

    return (
        <div className={cn(
                styles['status-network'], 
                cls,
                {
                    [styles['status-network--online']]: objStatusNetwork?.is_online
                }
            )}
        >   
            {objStatusNetwork?.is_online ? "онлайн" : 'в сети был' + objStatusNetwork?.last_online}
        </div>
    );
}