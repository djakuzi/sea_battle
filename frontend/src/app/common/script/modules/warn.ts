import { TypeCallback } from '../../types/typeCallback.type';

export function createMessageWarn<N, M>(name: N | string, message: M | string): string {
  return `${name}: ${message}`;
}

export class StandartWarn {
  private message: string;

  constructor(message: string) {
    this.message = message;
  }

  setWarn<R>(callback?: TypeCallback<R>): R | void {
    console.warn(this.message);
    if (callback) {
      return callback();
    }
  }
}
