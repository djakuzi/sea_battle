import { devModeConsole } from "@app-common/script/modules/Developer/methods/devModeConsole";
import { Warn } from "@app-common/script/utils/warn/class/warn.class";
import { IntrPlayerWithActionFriend } from "@app-common/types/players/playerWithActionFriend.interface";
import { FriendService } from "@app-network/api/client.api/services/Friend/Friend.service";
import { useEffect, useState } from "react";

export function useListFriend(idPlayer?: number, listPlayers?: IntrPlayerWithActionFriend[]) {
	const [error, setError] = useState<string | null>(null);
    const [listFriend, setListFriend] = useState<IntrPlayerWithActionFriend[] | null>(listPlayers ? listPlayers : null)

    async function updateListFriend():Promise<void> {
		try {
			const res = await FriendService.getFriends(idPlayer ? idPlayer : undefined);

			if (listFriend?.length === 0 || !listFriend) {
				throw new Warn('Список друзей пуст');
			}

			setListFriend(res.friends);
		} catch (error) {
			if (error instanceof Warn) {
				setError(error?.message)
				devModeConsole('warn', error.message);

				return;
			}

			if (error instanceof Error) {
				setError(error?.message)
				devModeConsole('error', error.message);
			}
		}    
    }

    useEffect( () => {
        updateListFriend();
    }, []);

    return {
        listFriend,
		error,
        updateListFriend,
    }
}