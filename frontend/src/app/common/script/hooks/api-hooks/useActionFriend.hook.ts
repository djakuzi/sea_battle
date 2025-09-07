import { IntrActionFriend } from "@app-common/types/friends/actionFriend.interface";
import { FriendService } from "@app-network/api/client.api/services/Friend/Friend.service";
import { createNotificftionByList } from "@app-rootController/Visual-Interface/elements/Notification/modules/notification";
import { showStandartApiCreatedInNotification } from "@app-rootController/Visual-Interface/elements/Notification/modules/scripts/standartApiCreated";
import { showStandartApiRemovedInNotification } from "@app-rootController/Visual-Interface/elements/Notification/modules/scripts/standartApiRemoved";
import { showStandartApiResponseInNotification } from "@app-rootController/Visual-Interface/elements/Notification/modules/scripts/standartApiResponse";
import { useState } from "react";

function setError(error: unknown) {
    if (error instanceof Error) {
        createNotificftionByList('error', error.message)
        console.error(error.message);
    } else {
        console.error('Unknown error:', error);
    }
}

export function useActionFriend(statusFriend: IntrActionFriend) {
    const [action, setAction] = useState(statusFriend?.action);

    async function changeAction(resAction = action):Promise<void> {
        try {
            if (resAction === 'accept' && typeof statusFriend.idRequest === 'number') {
                const res = await FriendService.acceptRequest(statusFriend.idRequest);

                if (res.isSucces) {
                    setAction('delete');
                }

                showStandartApiResponseInNotification('list', res);
                return;
            }
        } catch (error) {
            setError(error);
            return;
        }

        try {
            if (resAction === 'close' && typeof statusFriend.idRequest === 'number') {
                const res = await FriendService.closeRequest(statusFriend.idRequest);

                if (res.isSucces) {
                    setAction('add');
                }

                showStandartApiResponseInNotification('list', res);
                return;
            }
        } catch (error) {
            setError(error);
            return;
        }

        try {
            if (resAction === 'add') {
                const res = await FriendService.sendRequest(statusFriend.idPlayer);

                if (res.isCreated) {
                    setAction('close');
                    statusFriend.idRequest = res.idRequest;
                }

                showStandartApiCreatedInNotification('list', res);
                return;
            }
        } catch (error) {
            setError(error);
            return;
        }

        try {
            if (resAction === 'delete' && typeof statusFriend.idPlayer === 'number') {
                const res = await FriendService.deleteFriend(statusFriend.idPlayer);

                if (res.isRemoved) {
                    setAction('add');
                }

                showStandartApiRemovedInNotification('list', res);
                return;
            } else {
                console.warn('ID player is ' + typeof statusFriend.idPlayer);
                return;
            }
        } catch (error) {
            setError(error);
            return;
        }
    };

    return {
        action,
        setAction,
        changeAction
    }
}