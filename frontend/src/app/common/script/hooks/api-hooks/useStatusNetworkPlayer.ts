import { IntrStatusNetworkPlayer } from "@app-common/types/Player.interface";
import { PlayerService } from "@app-network/api/client.api/services/Player/Player.service";
import { useState } from "react";

interface HookStatusNetworkPlayer {
    objStatusNetwork: IntrStatusNetworkPlayer | null,
    getStatus: () => void,
}

export function useStatusNetworkPlayer(idPlayer: number | undefined, statusNetwork: IntrStatusNetworkPlayer | null): HookStatusNetworkPlayer {
    const [objStatusNetwork, setObjStatusNetwork] = useState<IntrStatusNetworkPlayer | null>(statusNetwork ? statusNetwork : null);

    async function getStatus() {
        try {
            const res = await PlayerService.getStatusOnline(idPlayer ? idPlayer : -2);
            if (res) {
                setObjStatusNetwork(res);
            }
        } catch (error) {
            console.error('Error fetching status:', error);
            setObjStatusNetwork(null);
        }
    }

    return {
        objStatusNetwork,
        getStatus,
    }
}