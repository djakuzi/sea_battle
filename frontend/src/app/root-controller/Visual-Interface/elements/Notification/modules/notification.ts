import { CONFIG_NOTIFICATION } from '@app-core/settings/notification.settings';
import { IntrNotification } from '../interfaces/Notification';
import { TypeNotification } from '../types/notification';
import { actionsNotification } from '../../../../../redux/slice/notification/notification.slice';
import store from '@app-redux/store';
import { showStandartApiCreatedInNotification } from './scripts/standartApiCreated';
import { showStandartApiResponseInNotification } from './scripts/standartApiResponse';
import { showStandartApiRemovedInNotification } from './scripts/standartApiRemoved';

/**
 * @function createNotificftionByList - создание уведомления для добавления в список
 * @param type - тип уведоления;
 * @param text - текст уведомления;
 * @param isBtn - false - скрыть кпопку закрытия;
 * @param time - по стандру стоит константное__@constant CONFIG_NOTIFICATION .
 */
export function createNotificftionByList(
  type: TypeNotification = 'notification',
  text: string,
  isBtn: boolean = false,
  time: number = CONFIG_NOTIFICATION.hide
): void {
  const notification: IntrNotification = {
    id: 0,
    type,
    text,
    settigsClose: {
      isBtn: isBtn,
    },
  };

  if (!isBtn) {
    notification.settigsClose.time = time;
  }

  store.dispatch(actionsNotification.addNotificationByList(notification));
}

/**
 * @function createOneNotificftion - создание одиночного уведомления
 * @param type - тип уведоления;
 * @param text - текст уведомления;
 * @param isBtn - false - скрыть кпопку закрытия;
 * @param time - по стандру стоит константное__@constant CONFIG_NOTIFICATION .
 */
export function createOneNotificftion(
  type: TypeNotification = 'notification',
  text: string,
  isBtn: boolean = false,
  time: number = CONFIG_NOTIFICATION.hide
): void {
  const notification: IntrNotification = {
    id: 0,
    type,
    text,
    settigsClose: {
      isBtn: isBtn,
    },
  };

  if (!isBtn) {
    notification.settigsClose.time = time;
  }

  store.dispatch(actionsNotification.addOneNotification(notification));
}

export const notification = {
  createNotificftionByList,
  createOneNotificftion,
  showStandartApiCreatedInNotification,
  showStandartApiRemovedInNotification,
  showStandartApiResponseInNotification,

};

export default notification;
