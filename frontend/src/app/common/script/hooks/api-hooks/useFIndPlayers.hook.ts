import { IntrActionFriend } from "@app-common/types/friends/actionFriend.interface";
import { IntrPlayerWithActionFriend } from "@app-common/types/players/playerWithActionFriend.interface";
import { FriendService } from "@app-network/api/client.api/services/Friend/Friend.service";
import { PlayerService } from "@app-network/api/client.api/services/Player/Player.service";
import { useState } from "react";

export interface IntrUseFindPlayers {
	listPlayers: IntrPlayerWithActionFriend[] | undefined;
	error: string | null;
	findFindPlayers: (filter: any) => Promise<void>;
	setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export function useFindPlayers(): IntrUseFindPlayers {
    const [listPlayers, setListPlayers] = useState<IntrPlayerWithActionFriend[]>();
    const [error, setError] = useState<string | null>(null);

    async function findFindPlayers(filter): Promise<void> {
        try {
            const responsePlayers = await PlayerService.findPlayers(filter);

            if (responsePlayers) {
                const playerIds = responsePlayers.players.map(player => player.id);

                const playersAction = await FriendService.getActionList(playerIds);

                if (!playersAction?.listActions) {
                    console.error("Error getting status the action friend")
                    setError('Произошла ошибка');
                    return;
                }

                const actionsMap = new Map<number, IntrActionFriend>(
                    playersAction.listActions.map(action => [action.idPlayer, action])
                );

                const responseActionPlayers: IntrPlayerWithActionFriend[] = responsePlayers.players.map(player => {
                    const itemAction = actionsMap.get(player.id);

                    return {
                        ...player,
                        actionFriends: itemAction ? itemAction : undefined,
                    };
                });

                setListPlayers(responseActionPlayers);
            }

            if (error) setError(null);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Такого игрока не найдено');
            }

            setListPlayers([]);
        }
    }

    return {
        listPlayers,
        error,
        findFindPlayers,
		setError,
    }
}