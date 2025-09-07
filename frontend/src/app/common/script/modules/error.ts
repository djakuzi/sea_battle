import { TypeCallback } from '../../types/typeCallback.type';
import { createNotificftionByList } from '../../../root-controller/Visual-Interface/elements/Notification/modules/notification';

export function createMessageError<N, M>(name: N | string, message: M | string): string {
  return `${name}: ${message}`;
}

export class StandartError {
  private message: string;
  private isNotification: boolean;

  constructor(message: string, isNotification: boolean = false) {
    this.message = message;
    this.isNotification = isNotification;
  }

  setError<R>(callback?: TypeCallback<R>): R | void {
    console.error(this.message);
    if (this.isNotification) {
      createNotificftionByList('error', this.message);
    }

    if (callback) {
      return callback();
    }
  }
}
