import { IntrApiResponse } from "@app-common/api-types/resultResponse.interface";
import { createNotificftionByList, createOneNotificftion } from "@app-rootController/Visual-Interface/elements/Notification/modules/notification";

export function showStandartApiResponseInNotification<R extends IntrApiResponse>(
    type: 'list' | 'one',
    res: R | null, 
    standartText?: string,
    isBtn?: boolean,
    time?: number
):void {

    switch (type) {
        case 'list':
            createNotificftionByList(
                (res?.isSucces) ? 'notification' : 'error',
                (res?.message) ? res.message : (standartText) ? standartText : 'Упс, произошла ошибка',
                isBtn,
                time,
            )
            break;
        case 'one':
            createOneNotificftion(
                (res?.isSucces) ? 'notification' : 'error',
                (res?.message) ? res.message : (standartText) ? standartText : 'Упс, произошла ошибка',
                isBtn,
                time,
            )
            break;
        default: 
        console.warn('Не получилось вывести уведомление');
            break;
    }
}