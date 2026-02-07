import { STANDART_SETTINGS } from "@app-core/settings/gameSettings.settings";
import { ServiceStatusPing } from "@app-network/ws/modules/ServerConnectionStatus/services/statusPing.service";
import { RootState } from "@app-redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface IntrHookStatusServer {
    ping: number | null;
}

export function usePing(): IntrHookStatusServer {
    //redux
    const { isConnect} = useSelector((s: RootState) => s.statusServer);
    const { pingTimeMS } = useSelector((s: RootState) => s.gameSettings.statusConnectionServer);
    //state
    const [ping, setPing] = useState<number | null>(null);

    useEffect(() => {
        const timeInterval = pingTimeMS ?? STANDART_SETTINGS.statusConnectionServer.pingTimeMS;
        let pingInterval: NodeJS.Timeout;

        if (isConnect) {
            sendPing();

            pingInterval = setInterval(() => {
                sendPing();
            }, timeInterval);
        }

        return () => {
            if (pingInterval) {
                clearInterval(pingInterval);
            }
        };
    }, [isConnect]);

    function sendPing() {
        if (isConnect) {
            ServiceStatusPing.sendPing((resPing) => setPing(resPing));
        }
    }

    return {
        ping: ping
    }
}