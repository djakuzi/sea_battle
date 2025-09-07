import { IntrPlayerWithActionFriend } from "@app-common/types/players/playerWithActionFriend.interface";
import { FriendService } from "@app-network/api/client.api/services/Friend/Friend.service";
import { useEffect, useState } from "react";

export function useListFriend(idPlayer?: number, listPlayers?: IntrPlayerWithActionFriend[]) {
    const [listFriend, setListFriend] = useState<IntrPlayerWithActionFriend[] | null>(listPlayers ? listPlayers : null)

    async function updateListFriend():Promise<void> {
        const res = await FriendService.getFriends(idPlayer ? idPlayer : undefined);
        
        setListFriend(res.friends);
    }

    useEffect( () => {
        updateListFriend();
    }, []);

    return {
        listFriend,
        updateListFriend,
    }
}